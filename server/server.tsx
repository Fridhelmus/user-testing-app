//import express from 'express';
// import bodyParser from 'body-parser';
// import session from 'express-session';
// import { authRoutes, localPassport, googlePassport, protectedRoutes } from './routes';
// import { pool, pgSessionStore, testConnection } from './db';
// require('dotenv').config();

// declare global {
//     namespace Express {
//         interface User {
//             id: number;
//             email: string;
//             password: string
//         }
//     }
// }

//const app = express();

// app.use(bodyParser.json());

// app.use(session({
//     store: new pgSessionStore({
//         pool,
//         tableName: 'session'
//     }),
//     secret: (process.env.SESSION_SECRET as string),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax'
//     }
// }));

// app.use(localPassport.initialize());
// app.use(localPassport.session());

// app.use(googlePassport.initialize());
// app.use(googlePassport.session());

// app.use(authRoutes);
// app.use(protectedRoutes);

// testConnection()
//     .then(() => {
//         console.log('Connection to database success');
//     }).catch(() => {
//         console.error('Failed to connect to database');
//         process.exit(1);
//     });

// 
import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import dotenv from 'dotenv'
import App from '../src/App'


const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname,'..','dist')))

app.get('/', (req, res) => {
  fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  })
})

const start = async () => {
  // try {
  //   await db.authenticate()
  //   await db.sync()
    app.listen(PORT, () => console.log('Server listening on port ' + PORT))
  // } catch (error) {
  //   console.log(error)
  // }
}

start()