import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import axios from 'axios';

config();

@Injectable()
export class FigmaService {

    async getFigmaToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.FIGMA_CLIENT_ID
        const client_secret = process.env.FIGMA_CLIENT_SECRET
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/figma/callback`

        const figmaToken = await axios.post('https://www.figma.com/api/oauth/token', {
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code: code,
            grant_type: 'authorization_code',
        })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error figma get access token: ", error);
        });
        console.log("figmaToken: ", figmaToken);
        return figmaToken;
    }

    async addService(req: any) {
        console.log("addService Figma");
        console.log("req.query: ", req);
        const userEmail = req.query.state
        const code = req.query.code
        console.log("code: ", code);
        console.log("userEmail: ", userEmail);
        const figmaAccesstoken = await this.getFigmaToken(code);
    }
}
