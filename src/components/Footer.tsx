import React from 'react'

const Footer = () => {
  return (
    <>
      <footer id='footer'>
        <div className='container'>
          <a
            href='https://github.com/Fridhelmus/user-testing-app'
            className='repo_link'
            target='_blank'
            rel='noreferrer'>
            GITHUB
          </a>

          <p>
            All rights reserved &nbsp;
            <a href='#' target='_blank' rel='noreferrer'>
              ©
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
