import { useParams } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react'

import logoImg from '../../assets/images/logo.svg'

import { Button } from '../../components/Button/Button'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import {
    Container,
    Header,
    Content,
    Main,
    Title,
    Form,
    FormFooter,
    UserInfo,
} from './Style'

type CodeParams = {
    id: string
}

type Questions = {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: string
    isHighLighted: string
}

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
    }
>

export function Room() {
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('')
    const { user } = useAuth()
    const params = useParams<CodeParams>()
    const roomId = params.id

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on('value', (room) => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions =
                databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(
                ([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighLighted: value.isHighLighted,
                        isAnswered: value.isAnswered,
                    }
                }
            )
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() == '') {
            return
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false,
        }

        await database.ref(`/rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

    return (
        <Container>
            <Header>
                <Content>
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </Content>
            </Header>
            <Main>
                <Title>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}
                </Title>
                <Form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <FormFooter>
                        {user ? (
                            <UserInfo>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </UserInfo>
                        ) : (
                            <span>
                                Para enviar uma pergunta,{' '}
                                <button>faça seu login</button>.
                            </span>
                        )}
                        <Button type="submit" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </FormFooter>
                </Form>
                {JSON.stringify(questions)}
            </Main>
        </Container>
    )
}