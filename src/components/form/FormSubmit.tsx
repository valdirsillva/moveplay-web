import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { api } from "../../services/api";
import style from '../form/form-submit.module.css';

interface Form {
    isPlaying: string
}

export function FormSubmit({ isPlaying }: Form) {
    const userlogged = 'Valdir Silva'
    const userLoggedImage = 'https://yt3.ggpht.com/yti/AJo0G0lwVFjZneCvA1NnEvssXL7qPz0PKdClcJtt2SGh89U=s108-c-k-c0x00ffffff-no-rj'

    const [comment, setComment] = useState({
        userAvatar: '',
        author: '',
        comment: '',
        commentRefVideo: '',
        createdAt: '',
    })

    const [comments, setListComments] = useState([{}])
    const [currentComment, setCurrentComment] = useState('')

    //ChangeEvent<HTMLInputElement>
    function onChangeComment(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value !== '') {
            setComment({
                userAvatar: userLoggedImage,
                author: userlogged,
                comment: e.target.value,
                commentRefVideo: isPlaying,
                createdAt: new Date().toLocaleString(),
            })
        }

        setCurrentComment(e.target.value)
    }

    async function formSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setListComments([comment, ...comments])

        await api.post('/video/comment', comment)

        setCurrentComment('')
    }

    return (
        <Fragment>
            <form onSubmit={formSubmit}>
                <div className={style.comment}>
                    <img src={userLoggedImage} alt='avatar' />
                    <div>
                        <input
                            type="text"
                            name="coments"
                            value={currentComment}
                            onChange={onChangeComment}
                            placeholder='Adicione um comentário...'
                        />
                    </div>
                </div>
            </form>
        </Fragment >
    )
}