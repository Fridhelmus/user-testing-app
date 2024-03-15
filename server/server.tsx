import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import { pool, pgSessionStore, testConnection } from './db'
import App from '../src/App'
import { authRoutes, localPassport, googlePassport, apiRouters } from './routes'
dotenv.config()

declare global {
  namespace Express {
    interface User {
      id: number
      email: string
      password: string
    }
  }
}

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
  session({
    store: new pgSessionStore({
      pool,
      tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    },
  }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(localPassport.initialize())
app.use(localPassport.session())
app.use(googlePassport.initialize())
app.use(googlePassport.session())
app.use(authRoutes)
app.use('/api', apiRouters)

app.get('/', (req, res) => {
  fs.readFile(path.resolve('./public/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`,
      ),
    )
  })
})

testConnection()
  .then(() => {
    console.log('Connection to database success')
    app.listen(PORT, () => console.log('Server listening on port ' + PORT))
  })
  .catch((e) => {
    console.error('Failed to connect to database: ', e.message)
    process.exit(1)
  })

testConnection()
