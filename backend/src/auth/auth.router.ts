/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import fetch from "cross-fetch";
import { generateRandomString } from "../utils/randomString";
import { stateKey, client_id, redirect_uri, client_secret } from "..";
import pool from "../db";
import { getUserId, storeSessionUserName } from "./auth.service";

import { saveAllArtists } from "../artists/artists.service";
import { saveAllTracks } from "../tracks/tracks.service";
import { saveAllPlaylists } from "../playlists/playlists.service";

/**
 * Router Definition
 */

export const authRouter = express.Router();

/**
 * Controller Definitions
 */


// GET 
authRouter.get('/now', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT NOW()')
        res.status(200).send(rows[0].now)
    } catch (err) {
        console.log(err)
    }
})

authRouter.get("/login", async (req: Request, res: Response) => {

    try {
        const { userName } = req.session
        if (userName) {
            console.log(`user "${userName}" already has session`);
            return res.redirect("http://localhost:3005/profile")
        }

        const state: string = generateRandomString(16);
        const scope: string = 'user-top-read';
        res.cookie(stateKey, state, {  maxAge: 20000 });

        const params = new URLSearchParams()
        params.append('response_type', 'code')
        params.append('client_id', client_id)
        params.append('scope', scope)
        params.append('redirect_uri', redirect_uri)
        params.append('state', state)
        res.redirect('https://accounts.spotify.com/authorize?' + params);
    } catch (e) {
        res.status(500).send(e.message)
    }
})


authRouter.get('/callback', async function (req: Request, res: Response) {
    const code = req.query.code as string;
    const queryState = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (queryState === null || storedState !== queryState) {
        res.redirect('/#' + (new URLSearchParams({ 'error': 'state_mismatch' })))
        console.warn("state mismatch, could be intercepted");

    } else {
        res.clearCookie(stateKey)

        const authBody = new URLSearchParams();
        authBody.append('code', code)
        authBody.append('redirect_uri', redirect_uri)
        authBody.append('grant_type', 'authorization_code')

        try {
            const tokenresponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    "Authorization": "Basic " + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: authBody,
            })
            const tokendata = await tokenresponse.json()

            const access_token = tokendata.access_token
            const refresh_token = tokendata.refresh_token

            
            const userresponse = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": "Bearer " + access_token
                }
            })
            const { id: user_name, display_name: displayname } = await userresponse.json();

            //check if user exists => gets id
            const user_id = await getUserId(access_token, refresh_token, user_name)


            // get artists and tracks 
            // ( these should probably be post reqs)
            var saveingtoDB = await Promise.allSettled([saveAllArtists(access_token, user_id, 'short_term'), 
                saveAllArtists(access_token, user_id, 'medium_term'), 
                saveAllArtists(access_token, user_id, 'long_term'),
                saveAllTracks(access_token, user_id, 'short_term'), 
                saveAllTracks(access_token, user_id, 'medium_term'), 
                saveAllTracks(access_token, user_id, 'long_term'),
                saveAllPlaylists(access_token, "SWEDEN"),
                saveAllPlaylists(access_token, "USA"),
                saveAllPlaylists(access_token, "ARGENTINA"),
                saveAllPlaylists(access_token, "GLOBAL")])

            console.log(saveingtoDB);

            storeSessionUserName(req, user_name, displayname)
            res.redirect("http://localhost:3005/profile")

        } catch (error) {
            console.error("token, user or artists fetch error: ", error);
        }
    }

});


authRouter.get("/logout", async (req: Request, res: Response) => {
    try {
        res.status(200).send("not yet implemented, please log out via spotify.com")
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// POST 

// PUT 

// DELETE 