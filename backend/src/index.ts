/**
 * Required External Modules
 */
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple';
import pool from './db';
import { authRouter } from './auth/auth.router';
import { artistsRouter } from './artists/artists.router';
import { tracksRouter } from './tracks/tracks.router';
import { playlistsRouter } from './playlists/playlists.router';
import { userRouter } from './user/user.router';

/**
 * App Variables
 */

dotenv.config({ path: '../../.env' })
export const PORT: number = parseInt(process.env.API_PORT as string)
export const client_id: string = process.env.SPOTIFY_CLIENT_ID
export const client_secret: string = process.env.SPOTIFY_CLIENT_SECRET
export const redirect_uri: string = `http://localhost:${PORT}/auth/callback`
export const stateKey: string = 'spotify_auth_state';
const secret: string = process.env.COOKIE_SECRET
const conString: string = `pg://${process.env.DB_USER}:
    ${process.env.DB_PASSWORD}@${process.env.DB_HOST}:
    ${process.env.DB_PORT}/${process.env.DB_NAME}`

export const SelectCountry = {
    SWEDEN: {id: "37i9dQZEVXbLoATJ81JYXz", val: 987987987},
    GLOBAL: {id: "37i9dQZEVXbMDoHDwVN2tF", val: 987987986},
    USA: {id: "37i9dQZEVXbLRQDuF5jeBp", val: 987987985},
    ARGENTINA: {id: "37i9dQZEVXbMMy2roB9myp", val: 987987984}
}

/**
 *  App Configuration
 */


const app = express()
app.use(cors({credentials: true, origin: ["http://localhost:3005", "http://localhost:5005"]}))
// USE WITH NGINGX LATER
// location /fonts {
//     # this will echo back the origin header
//     if ($http_origin ~ "example.org$") {
//         add_header "Access-Control-Allow-Origin" $http_origin;
//     }
// }

app.use(cookieParser())


const PGSession = connectPgSimple(session)
app.use(session({
    store: new PGSession({
        pool: pool,
        tableName: 'session',
        conString: conString,
        
    }),
    secret: secret,
    cookie: {
        secure: false, // https
        httpOnly: true,
        sameSite: true,
        maxAge: 24 * 60 * 60 * 2,
        
    },
    saveUninitialized: true,
    resave: false,
}))


app.use(helmet())
/*
https://www.reddit.com/r/node/comments/ksth2o/express_helmet_the_musthave_seatbelt_for_a_secure/
-CSP (Content-Security-Policy) header is a double- edge sword. 
-You need to know what it can do or you can run into some weird bugs, 
-and Helmet just abstracts it.
 
-Just want to mention: many features of helmet are only useful if 
-you're not serving your app through something like NGINX.
So I wouldn't call it "must-have".
*/


/**
 * Server Activation
 */


app.use("/auth", authRouter)
app.use("/artists", artistsRouter)
app.use("/tracks", tracksRouter)
app.use("/playlists", playlistsRouter)
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log(`api listening at http://0.0.0.0:${PORT}`)

})