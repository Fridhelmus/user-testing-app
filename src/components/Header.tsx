import React, { useContext, useState } from 'react'
import { IAuthContext, AuthContext } from '../context/AuthContext'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const Header: React.FC = () => {
  const { user, setUser } = useContext<IAuthContext>(AuthContext)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const openModal = (login: boolean) => {
    setIsLogin(login)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
      confirmPassword: { value: string }
    }
    const email = target.email.value
    const password = target.password.value
    const confirmPassword = target.confirmPassword.value

    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        passwordConfirmation: confirmPassword,
      }),
    })

    if (response.ok) {
      setUser(email)
    } else {
      console.error('Error logging in:', response.statusText)
    }
  }

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    if (response.ok) {
      setUser(email)
    } else {
      console.error('Error logging in:', response.statusText)
    }
  }

  return (
    <header id='header'>
      <div className='container'>
        <div className='navbar'>
          <h4>USER TESTING...</h4>
          {user ? (
            <p>Welcome, {user}!</p>
          ) : (
            <>
              <button
                className='signin-signup-button'
                onClick={() => openModal(false)}>
                SIGN UP
              </button>
              <button
                className='signin-signup-button'
                onClick={() => openModal(true)}>
                SIGN IN
              </button>{' '}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='modal'>
                <form
                  className='nav_menu column'
                  onSubmit={isLogin ? handleSignIn : handleSignUp}>
                  <input type='email' placeholder='Email' name='email' />
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                  />
                  {isLogin ? null : (
                    <input
                      type='password'
                      placeholder='Confirm Password'
                      name='confirmPassword'
                    />
                  )}
                  <button type='submit'>
                    {isLogin ? 'SIGN IN' : 'SIGN UP'}
                  </button>
                </form>
              </Modal>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header