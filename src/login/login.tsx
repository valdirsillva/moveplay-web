import { FormEvent, ChangeEvent, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../contexts/auth'
import style from '../login/login.module.css'
import { api } from '../services/api'

interface User {
  email: string
  password: string
}

export default function Login() {
  const navigation = useNavigate()

  const { signed, signIn } = useContext(AuthContext)

  const [createAccount, setCreateAccount] = useState(false)
  const [userLogin, setUserLogin] = useState('')
  const [userPassLogin, setUserPassLogin] = useState('')
  const [userName, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userImage, setUserImage] = useState<File[] | ''>('')

  const handleChangedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const changeImageSelected = Array.from(event.target.files)
    setUserImage(changeImageSelected)
  }

  const onCreateAccount = (event: FormEvent) => {
    event.preventDefault()

    setCreateAccount(true)
    if (createAccount) {
      setCreateAccount(false)
    }
  }

  function handleSignIn(event: FormEvent) {
    event.preventDefault()
    try {
      let data = new FormData()

      data.append('username', userName)
      data.append('email', userEmail)
      data.append('password', userPassword)
      data.append('image', userImage[0])

      api.post('/users/create', data)
        .then(function (response) {
          toast.success(`${response.data.success}`)
        })
        .catch(function (error) {
          const { message } = { message: error.response.data.message }
          console.log(message)
          toast.error(`${message}`)
        });

    } catch (error) {
      console.log(error)
    }
  }

  const onLogin = async (event: FormEvent) => {
    event.preventDefault()

    const loginUser = {
      email: userLogin,
      password: userPassLogin
    }

    if (validateUser(loginUser)) {
      toast.info('Login ou senha está vazio.')
      return
    }

    await signIn(loginUser)

    if (signed) {
      return navigation('/home')
    }
  }

  const validateUser = (user: User) => {
    if (!user.email || !user.password) {
      return true
    }

    return false
  }


  return (
    <div className={style.wrapperContent}>

      <div>
        <ToastContainer />

      </div>

      <div className={`${style.loginText} ${style.contentExpand}`}>
        <div className={`${style.text} ${style.showHide}`}>
          {createAccount ? (
            <div>
              <h1>ENTRAR</h1>
              <form onSubmit={onLogin}>
                <div className={style.field}>
                  <input
                    type="text"
                    name='email' placeholder='LOGIN'
                    value={userLogin}
                    onChange={(event) => setUserLogin(event.target.value)}
                  />
                </div>

                <div className={style.field}>
                  <input
                    type="password"
                    name='password'
                    value={userPassLogin}
                    onChange={(event) => setUserPassLogin(event.target.value)}
                    placeholder='SENHA'
                  />
                </div>

                <div className={style.btnItems}>
                  <button
                    type='submit'
                    className={style.btnLogin}
                  >
                    ENTRAR
                  </button>

                  <button
                    className={style.btnSignup}
                    onClick={(event) => onCreateAccount(event)}
                  >
                    Não tenho conta
                  </button>
                </div>
              </form>
            </div>


          ) : (

            <div>
              <h1>CRIAR CONTA</h1>
              <form onSubmit={handleSignIn} method='post' encType='multipart/form-data'>
                <div className={style.field}>
                  <input
                    type="text"
                    name='username'
                    value={userName}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder='NOME'
                  />
                </div>

                <div className={style.field}>
                  <input
                    type="text"
                    name='email'
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                    placeholder='E-MAIL'
                  />
                </div>

                <div className={style.field}>
                  <input
                    type="file"
                    name='image'
                    onChange={handleChangedFile}
                  />
                </div>

                <div className={style.field}>
                  <input
                    type="password"
                    name='password'
                    value={userPassword}
                    onChange={(event) => setUserPassword(event.target.value)}
                    placeholder='SENHA'
                  />
                </div>

                <div className={style.btnItems}>
                  <button
                    type='submit'
                    className={style.btnLogin}
                  >
                    CRIAR CONTA
                  </button>

                  <button
                    className={style.btnSignup}
                    onClick={(event) => onCreateAccount(event)}
                  >
                    Fazer login
                  </button>
                </div>
              </form>
            </div>

          )}
        </div>

      </div>
    </div>
  )
}