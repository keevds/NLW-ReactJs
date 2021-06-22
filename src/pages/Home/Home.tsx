import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

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
    const { user, signWithGoogle } = useAuth()

    async function handleCreateRoom() {
        if (!user) {
            await signWithGoogle()
        }

        history.push('/rooms/new')
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
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </RightContainer>
            </RightContent>
        </Container>
    )
}
