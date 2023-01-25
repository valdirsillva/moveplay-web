import { api } from '../../services/api';

import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './createpublished.module.css'

export function CreatePublished() {
    const [author, setAuthor] = useState('')
    const [link, setLink] = useState('')
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('video')
    const [video, setVideo] = useState<File[] | ''>('')
    const [description, setDescription] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
    }

    function handleChangedFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        const selectedFile = Array.from(event.target.files)
        setVideo(selectedFile)
    }

    function createNewPublication(event: FormEvent) {
        event.preventDefault()

        try {
            let data = new FormData()
            data.append('author', String(author))
            data.append('title', String(title))
            data.append('description', String(description))
            data.append('link', String(link))
            data.append('url', video[0])

            api.post('/video/add', data)
                .then((response) => {
                    clearInputs()
                    toast.success(`${response.data.success}`)
                })
                .catch((error) => {
                    const { message } = { message: error.response.data.message }
                    toast.error(`${message}`)
                    console.log(message)
                })
        } catch (err) {
            console.log(err)
        }
    }

    function clearInputs() {
        setTitle('')
        setVideo('')
        setValue('')
        setAuthor('')
        setDescription('')
    }

    return (

        <Dialog.Portal>

            <Dialog.Overlay />

            <Dialog.Content className={style.DialogContent}>
                <Dialog.Close asChild>
                    <button className={style.IconButton} aria-label="Close">
                        <X size={32} color="#fff" />
                    </button>
                </Dialog.Close>
                <Dialog.Title className={style.DialogTitle}>CRIAR NOVA PUBLICAÇÃO</Dialog.Title>
                <Dialog.Description className={style.DialogDescription}>
                    {/* TEXT */}
                    <ToastContainer />

                </Dialog.Description>
                <form onSubmit={createNewPublication} method='post' encType='multipart/form-data'>
                    <div className={style.box}>
                        <div className={style.fieldItem}>
                            <label htmlFor="">Nome do autor</label>
                            <input
                                type="text"
                                name="author"
                                value={author}
                                onChange={event => setAuthor(event.target.value)}
                                placeholder="Author"
                            />
                        </div>

                        <div className={style.fieldItem}>
                            <label htmlFor="title">Título do vídeo</label>
                            <input
                                type="text"
                                name="title"
                                id='title'
                                value={title}
                                onChange={event => setTitle(event.target.value)}
                                placeholder='Titulo'
                            />
                        </div>


                        <div className={`${style.fieldItem} ${style.fieldItem100}`}>
                            <label htmlFor="description">Descrição</label>
                            <input
                                type="text"
                                id='description'
                                name="description"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                                placeholder='Descrição'
                            />
                        </div>

                        <div className={`${style.fieldItem100} ${style.formControl}`}>
                            <FormControl>
                                <FormLabel id="radiobutton-default">Selecione o tipo de arquivo</FormLabel>
                                <RadioGroup
                                    aria-labelledby="radiobutton-default"
                                    name="radio-buttons-group"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="video" control={<Radio />} label="Pegar vídeo do computador" />
                                    <FormControlLabel value="link" control={<Radio />} label="Incluir link externo" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {value === 'video' ? (
                            <div className={style.fieldItem}>
                                <label htmlFor="video">Vídeo</label>
                                <input
                                    type="file"
                                    name="url"
                                    id="video"
                                    onChange={handleChangedFile}
                                />
                            </div>
                        ) : (
                            <div className={style.fieldItem}>
                                <label htmlFor="description">Incorporar vídeo do Youtube/Instagram</label>
                                <input
                                    type="text"
                                    id='link'
                                    name="link"
                                    value={link}
                                    onChange={event => setLink(event.target.value)}
                                    placeholder='link do video'
                                />
                            </div>
                        )}

                        <div className={style.fieldItem100}>
                            <button type='submit' className={style.buttonCreate}>
                                SALVAR
                            </button>
                        </div>
                    </div>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}