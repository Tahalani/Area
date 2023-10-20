import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';

@Injectable()
export class SpotifyService {

    private client_id = '3f5afd10c49a439085bb7ab556fd69f8';
    private redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/spotify/callback`
    private client_secret = 'a17d908f62ed4be7a113d2413585aacb'

    async getSpotifyToken({ code }: { code: string }): Promise<string | string[] | undefined> {
        const spotifyToken = await axios.post(
            `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${this.redirect_uri}&client_id=${this.client_id}&client_secret=${this.client_secret}`
        ).then((res) => res.data)
        .catch((error) => {
            console.log("error get access token: ", error);
        });
        return spotifyToken.access_token;
    }

    async addService(req: any) : Promise<void> {
        console.log("addService Spotify");
        console.log("req: ", req);
        const code = req.query.code;
        console.log("code: ", code);
        const SpotifyAccesstoken = await this.getSpotifyToken({ code: code });
        console.log("SpotifyAccesstoken: ", SpotifyAccesstoken);
    }
}
