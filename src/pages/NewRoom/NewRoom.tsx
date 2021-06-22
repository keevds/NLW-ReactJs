import { Link } from 'react-router-dom'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import {
    Container,
    LeftContent,
    RightContainer,
    RightContent,
} from '../Home/Style'

import { Button } from '../../components/Button/Button'
// import { useAuth } from '../../hooks/useAuth'

export function NewRoom() {
    // const { user } = useAuth()

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
                    <h2>Criar nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em um sala existente?
                        <Link to="/">clique aqui</Link>
                    </p>
                </RightContainer>
            </RightContent>
        </Container>
    )
}
