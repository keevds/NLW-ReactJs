import { useParams, useHistory } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'

import { Button } from '../../components/Button/Button'
import { RoomCode } from '../../components/RoomCode'
import { useRoom } from '../../hooks/useRoom'
import { Question } from '../../components/Question/Question'
import { database } from '../../services/firebase'

import { Container, Header, Content, Main, Title, QuestionsContainer, ButtonRemove } from './Style'

type CodeParams = {
  id: string
}

export function AdminRoom() {
  const params = useParams<CodeParams>()
  const roomId = params.id
  const history = useHistory()

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <Container>
      <Header>
        <Content>
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </Content>
      </Header>
      <Main>
        <Title>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </Title>
        <QuestionsContainer>
          {questions.map((question) => {
            return (
              <Question key={question.id} content={question.content} author={question.author}>
                <ButtonRemove type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover pergunta"></img>
                </ButtonRemove>
              </Question>
            )
          })}
        </QuestionsContainer>
      </Main>
    </Container>
  )
}
