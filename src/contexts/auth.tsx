import React, { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '../services/api';

import { LocalStorageData } from '../utils/local-storage-data'

const newLocalStorage = new LocalStorageData()

interface LoginUserProps {
    email: string | null
    password: string | null
}

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn: (loginUser: LoginUserProps) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [signed, setSigned] = useState(false)
    const [user, setUser] = useState<object | null>({})

    async function signIn(loginUser: LoginUserProps) {
        try {

            let response = await api.post('/login/auth', loginUser)

            const { username, email, image } = response.data.user
            let token = response.data.token

            setUser(response.data.user)

            localStorage.setItem('@Auth:user', username)
            localStorage.setItem('@Auth:email', email)
            localStorage.setItem('@Auth:image', image)

            if (token) {
                setSigned(true)

                newLocalStorage.create(token)
            }

        } catch (err: any) {
            setSigned(false)
            console.log(err.response.data.error)

            toast.error(`${err.response.data.error}`)
        }
    }

    function signOut() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ signed, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider >
    )
}