import { Fragment } from 'react'
import style from './Comment.module.css'

interface CommentProps {
    userAvatar: string;
    author: string;
    comment: string;
    createdAt: string;
}

export function Comment(props: CommentProps) {
    return (
        <Fragment>
            <div className={style.comments}>
                {props.userAvatar ? (
                    <img src={props.userAvatar} alt='avatar' />
                ) : ''}
                <div className={style.commentInfo}>
                    <div className={style.contentComment}>
                        <p>{props.author}</p>
                        <span>{props.comment}</span>
                        <span>{props.createdAt}</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}