import { api } from '../../services/api';
import { Player } from './Player';
import { ChatDots, Heart } from 'phosphor-react'
import { useEffect, useState, useRef, Fragment } from 'react';
import { Header } from '../header/Header';
import { Comment } from '../comment/Comment';
import { FormSubmit } from '../form/FormSubmit';
import { Sidebar } from '../sidebar/Sidebar';

import style from './video.module.css'

import { getToken } from '../../utils/local-storage-get-token';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface VideoData {
    id: string;
    author: string;
    url: string;
    title: string;
    likes: number;
    views: string;
    description: string;
}

export function VideoPlayer() {
    const login = useNavigate()

    const endpoint = `http://localhost:3000/`

    const videoRef = useRef('')
    const videoIdIsPlaying = useRef('')

    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')

    const [like, setLike] = useState(0)
    const [title, setTitle] = useState('')
    const [views, setViews] = useState('')
    const [comments, setListComments] = useState([{}])
    const [video, setVideo] = useState<VideoData[]>([])

    let token = getToken()

    function hasUserAuthenticated(token: string | null) {
        if (token === null) {
            login('/')
            toast.error("Acesso negado! Por favor faça login.")
            return
        }
    }

    useEffect(() => {
        hasUserAuthenticated(token)
        api.get('videos', {
            headers: {
                'Authorization': `token ${token}`
            }
        }).then(({ data }) => {
            setVideo(data)
        })

    }, []);


    const onClickVideo = async (source: string) => {
        const videoFiltered = video.find(({ url }) => url === source)

        videoRef.current = source

        if (videoFiltered !== undefined) {
            setAuthor(videoFiltered.author)
            setDescription(videoFiltered.description)
            setLike(videoFiltered.likes)
            setTitle(videoFiltered.title)
            setViews(videoFiltered.views)

            videoIdIsPlaying.current = videoFiltered?.id

            getComments(videoIdIsPlaying.current)
        }
    }

    async function toLiked() {
        let videoId = 'clc81ye270000v2c05w36x2o7'

        try {
            setLike(like + 1)

            await api.post(`video/like/${videoId}`)
        } catch (error) {
            console.log(error)
        }
    }

    function getComments(videoId: string) {
        api.get(`video/comments/${videoId}`)
            .then(({ data }) => {
                setListComments(data)
            })
    }

    return (
        <Fragment>
            <Header />

            <div className={style.box}>
                <div className={style.video}>
                    <Player
                        source={`${videoRef.current}`}
                        playWidth={900}
                        playHeight={506}
                    />

                    <div className={style.videoDetails}>
                        <div className={style.title}>
                            {title}
                            <span>{views ?? 0} Visualizações</span>
                        </div>

                        <div className={style.items}>
                            <div className={style.countComments}> {comments.length}
                                <ChatDots size={32} />
                            </div>

                            <div className={style.countLikes}>{like}
                                <Heart size={32} color="#f00" weight='fill'
                                    onClick={toLiked}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={style.descriptionDetails}>
                        <div className={style.flexAuthors}>
                            <img src="https://yt3.ggpht.com/yti/AJo0G0lwVFjZneCvA1NnEvssXL7qPz0PKdClcJtt2SGh89U=s108-c-k-c0x00ffffff-no-rj" alt='avatar' />
                            <div className={`${style.videoDescription} ${style.text}`}>
                                <span>{author}</span>
                                {description}
                            </div>
                        </div>
                    </div>

                    <FormSubmit
                        isPlaying={videoIdIsPlaying.current}
                    />

                    {comments.map(({ userAvatar, author, comment, createdAt }: any) => {
                        return (
                            <Comment
                                userAvatar={userAvatar ?? 'https://yt3.ggpht.com/yti/AJo0G0lwVFjZneCvA1NnEvssXL7qPz0PKdClcJtt2SGh89U=s108-c-k-c0x00ffffff-no-rj'}
                                author={author}
                                comment={comment}
                                createdAt={createdAt}
                            />
                        )
                    })}

                </div>

                <aside className={style.listVideo}>
                    {video.map(item => {
                        return (
                            <div key={item.id} >
                                <Sidebar
                                    title={item.title}
                                    author={item.author}
                                    url={item.url}
                                    endpoint={endpoint}
                                    onClickVideo={onClickVideo}
                                />
                            </div>
                        )
                    })}
                </aside >
            </div >
        </Fragment>

    );
}