import { Injectable, } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { config } from 'dotenv';

config();

async function getMicrosoftToken({ code }: { code: string }): Promise<string | string[] | undefined> {
  const MicrosoftToken = await axios
    .post(
      `https://Microsoft.com/login/oauth/access_token?client_id=${process.env.Microsoft_CLIENT_ID}&client_secret=${process.env.Microsoft_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  const decoded = querystring.parse(MicrosoftToken);
  const accessToken = decoded.access_token;
  return accessToken;
}


@Injectable()
export class MicrosoftService {
    async addService(request: any): Promise<Boolean> {
      const userToken = request.query.state; // grace à ca on sait qui a fait la demande
      const code = request.query.code; // a voir si il faut garder code ou access token
      const MicrosoftAccesstoken = await getMicrosoftToken({ code: request.query.code });
      // console.log("usertoken", userToken, " Gihubtoken ", MicrosoftAccesstoken);
      if (MicrosoftAccesstoken !== null) {

        // enregistrer le token dans la base de donnée

        return true;
      } else {
        return false;
      }
    }
}
