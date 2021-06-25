import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

export const Botao = styled.button`
    height: 50px;
    border-radius: 8px;
    font-weight: 500;
    background: #835afd;
    color: white;
    padding: 0 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    > img {
        margin-right: 8px;
    }

    &:not(:disabled):hover {
        filter: brightness(0.9);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &.outlined {
        background: #fff;
        color: #835afd;
        border: 1px solid #835afd;
    }
`

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <Botao
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}
