import copyImg from '../assets/images/copy.svg'

import styled from 'styled-components'

export const Button = styled.button`
    height: 40px;
    border-radius: 8px;
    overflow: hidden;

    background: #fff;
    border: 1px solid #835afd;
    cursor: pointer;

    display: flex;

    > span {
        display: block;
        align-self: center;
        flex: 1;
        padding: 0 16px 0 12px;
        width: 230px;
        font-size: 14px;
        font-weight: 500;
    }
`
export const Copiar = styled.div`
    background: #835afd;
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
`

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClippboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <Button onClick={copyRoomCodeToClippboard}>
            <Copiar>
                <img src={copyImg} alt="Copiar Sala" />
            </Copiar>
            <span>Sala #{props.code}</span>
        </Button>
    )
}
