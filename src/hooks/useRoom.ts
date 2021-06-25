import { useState, useEffect } from 'react'
import { database } from '../services/firebase'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<
    string,
    {
        author: {
            name: string
            avatar: string
        }
        content: string
        isAnswered: string
        isHighLighted: string
        likes: Record<
            string,
            {
                authorId: string
            }
        >
    }
>

type Questions = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: string
    isHighLighted: string
    likeCount: number
    likeId: string | undefined
}

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('')

    const { user } = useAuth()

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', (room) => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })

        return () => {
            roomRef.off('value')
        }
    }, [roomId, user?.id])

    return { questions, title }
}
