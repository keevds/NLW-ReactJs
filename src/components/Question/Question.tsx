import { ReactNode } from 'react'
import { Questions, UserInfo } from './Style'

type QuestionsProps = {
    content: string
    author: {
        name: string
        avatar: string
    }
    children?: ReactNode
}

export function Question({ content, author, children }: QuestionsProps) {
    return (
        <Questions>
            <p>{content}</p>
            <footer>
                <UserInfo>
                    <img src={author.avatar} alt={author.name}></img>
                    <span>{author.name}</span>
                </UserInfo>
                <div>{children}</div>
            </footer>
        </Questions>
    )
}
