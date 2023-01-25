import React from 'react'

import style from './profile.module.css'
import { X } from 'phosphor-react'
import { api } from '../../services/api'

import * as Dialog from '@radix-ui/react-dialog'
import { deleteToken } from '../../utils/local-storage-get-token'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface ProfileUser {
    user: string | null
    image?: string
    email: string | null
}

export function Profile(props: ProfileUser) {
    const login = useNavigate()

    async function logout() {
        deleteToken()
        try {
            await api.get('login/logout')
                .then(response => {
                    const { token, message } = response.data
                    if (!token) {
                        login('/')
                        toast.error(`${message}`)
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }


    return (

        <section className={style.profile}>
            <Dialog.Root>
                <Dialog.Trigger >
                    <img src={`${props?.image}`} />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className={style.overlay} />

                    <Dialog.Content>
                        <div className={style.boxContent}>
                            <Dialog.Close className={style.closeBoxProfile}>
                                <X size={20} color="#ffffff" aria-label="Fechar" />
                            </Dialog.Close>

                            <>
                                <div className={style.profileNameUser}>
                                    <span>{props.user}</span>

                                    <span className={style.userEmail}>{props.email}</span>
                                </div>

                                <div>
                                    <button
                                        type='button'
                                        onClick={logout}
                                    >Sair</button>
                                </div>
                            </>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </section>
    )
}