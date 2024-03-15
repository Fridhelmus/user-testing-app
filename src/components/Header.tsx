import React, { useContext } from 'react'
import { IAuthContext, AuthContext } from '../context/AuthContext'

const Header: React.FC = () => {
  const { user, setUser } = useContext<IAuthContext>(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <header id='header'>
      <div className='container'>
        <div className='navbar'>
          <h4>USER TESTING...</h4>
          {user ? (
            <p>Welcome, {user}!</p>
          ) : (
            <form className='nav_menu' onSubmit={handleSubmit}>
              <input type='email' placeholder='Email' name='email' />
              <input type='password' placeholder='Password' name='password' />
              <input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
              />
              <button type='submit'>SIGN IN</button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
