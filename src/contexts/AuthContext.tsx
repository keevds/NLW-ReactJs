import { createContext, ReactNode, useState, useEffect } from 'react'
import { auth, firebase } from '../services/firebase'

// Types
type User = {
    name: string
    id: string
    avatar: string
}
type AuthContextType = {
    user: User | undefined
    signWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

//Types do Children
type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>() //

    //Guarda as as infos do usuário
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.')
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                })
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    //Pega as infos do Firebase e coloca no User
    async function signWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}
