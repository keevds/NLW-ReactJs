import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import {
    Container,
    LeftContent,
    RightContainer,
    RightContent,
    Separator,
    CreateRoom,
} from './Style'

import { Button } from '../../components/Button/Button'

export function Home() {
    const history = useHistory()
    const { user, signWithGoogle } = useAuth() //Pego o user do UseAuth
    const [roomCode, setRoomCode] = useState('')

    //Executa a signWithGoogle depois do click
    async function handleCreateRoom() {
        if (!user) {
            await signWithGoogle()
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() == '') {
            return
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return
        }

        history.push(`rooms/${roomCode}`)
    }

    return (
        <Container>
            <LeftContent>
                <img
                    src={illustrationImg}
                    alt="Ilustração simbolizando perguntas e respostas "
                />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </LeftContent>
            <RightContent>
                <RightContainer>
                    <img src={logoImg} alt="Letmeask" />
                    <CreateRoom onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google"></img>
                        Crie sua sala com o Google
                    </CreateRoom>
                    <Separator>ou entre em uma sala</Separator>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={(event) =>
                                setRoomCode(event.target.value)
                            }
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </RightContainer>
            </RightContent>
        </Container>
    )
}
