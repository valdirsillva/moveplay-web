import { useContext, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { BellRinging, Plus } from 'phosphor-react'
import { CreatePublished } from '../modal/CreatePublished';

import style from './header.module.css'
import { Profile } from '../profile/profile';

export function Header() {
    const [search, setSearch] = useState('')
    const [modalOpenning, setModalOpenning] = useState(false)

    const [user, setUser] = useState<string | null>('')
    const [email, setEmail] = useState<string | null>('')
    const [image, setImage] = useState<string | null>('')

    useEffect(() => {
        function loadStorageData() {
            const user = localStorage.getItem('@Auth:user')
            const email = localStorage.getItem('@Auth:email')
            const image = localStorage.getItem('@Auth:image')

            if (user != '' && email != '') {
                setUser(user)
                setEmail(email)
                setImage(image)
            }

        }
        loadStorageData()

    }, [])

    const notificationModalShow = () => {
        setModalOpenning(true)
    }

    const notificationModalHide = () => {
        setModalOpenning(false)
    }

    return (
        <header className={style.appHeader}>
            <div className={style.logo}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22 1v2h-2v-2h-2v4h-12v-4h-2v2h-2v-2h-2v22h2v-2h2v2h2v-4h12v4h2v-2h2v2h2v-22h-2zm-18 18h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm6 8v-6l5 3-5 3zm12 4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
                </svg>
                <span>MOVIEPLAY</span>
            </div>
            <div className={style.box}>
                <form className={style.formSearch}>
                    <input
                        type="search"
                        name="pesquisar"
                        value={search}
                        placeholder="Pesquisar"
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
            </div>

            <div className={style.notification}>
                <BellRinging
                    className={style.bell}
                    color="#fff"
                    weight="fill"
                    size={32}
                    onClick={() => notificationModalShow()}
                />
                <span className={style.notificationCounter}>6</span>
                {modalOpenning ?
                    <div className={`${style.popoverbox}`} id="Notificacao">
                        <aside className={style.notificationHeader}>
                            <span> Notificações</span>
                            <section></section>
                            <section className={style.onClosed}>
                                <button
                                    type="button"
                                    className={style.close}
                                    data-dismiss="modal"
                                    aria-label="Fechar"
                                >
                                    <span
                                        aria-hidden="true"
                                        onClick={() => notificationModalHide()}
                                    >×</span>
                                </button>
                            </section>
                        </aside>

                        <span className={`${style.noneNotification} ${style.notificationIsEmpty}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z" /></svg>
                            <br />
                            Suas notificações são exibidas aqui
                        </span>
                    </div>
                    : ''}

            </div>

            <section className={style.modalAdd}>
                <Dialog.Root>
                    <CreatePublished />
                    <Dialog.Trigger >
                        <button type='button' className={style.buttonOnPlus}>
                            <Plus
                                size={32}
                                color="#fff"
                            />
                        </button>
                    </Dialog.Trigger>
                </Dialog.Root>
            </section>

            <Profile
                user={user}
                email={email}
                image={image!}
            />

        </header>

    );
}