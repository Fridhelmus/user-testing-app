import * as React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import Modal from 'react-modal'
import './styles.scss'

// Modal.setAppElement('#root')

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
