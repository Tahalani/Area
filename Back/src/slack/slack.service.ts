import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

config();

@Injectable()
export class SlackService {

    async getSlackToken(code : string) : Promise<any | undefined> {
        const client_id = process.env.SLACK_CLIENT_ID
        const client_secret = process.env.SLACK_CLIENT_SECRET
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/slack/callback`

        console.log("client_id: ", client_id);
        console.log("client_secret: ", client_secret);
        console.log("redirect_uri: ", redirect_uri);
        console.log("code: ", code);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };

        const body = {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri,
        }

        const response = await axios.post('https://slack.com/api/oauth.v2.access', body, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
            console.log("Error getting Slack token: ", err);
        });

        return response;
    }

    async getUserInfo(accesstoken: string) {
        const headers = {
            contentType: 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + accesstoken,
        }

        const userInfo = await axios.get('https://slack.com/api/users.lookupByEmail', { headers: headers })
        .then((res) => res.data)
        .catch(function (error) {
            console.log("error slack get user info: ", error);
        });

        return userInfo;
    }

    async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
        console.log("saveToken ...");
    }

    async addService(req: any) {
        console.log("addService");
        console.log("req: ", req);
        const userEmail = req.query.state;
        const code = req.query.code;
        if (userEmail === undefined) {
            console.log("Error getting user email");
            return;
        }

        if (code === undefined) {
            console.log("Error getting code");
            return;
        }

        const slackAccessToken = await this.getSlackToken(code);

        if (slackAccessToken === undefined) {
            console.log("Error getting Slack token");
            return;
        }

        const accessToken = slackAccessToken.access_token;
        const infoUser = await this.getUserInfo(accessToken);

        console.log("infoUser: ", infoUser);

        if (infoUser.ok === false) {
            console.log("Error getting user info");
            return;
        }
        const serviceIdentifier = infoUser.email;
        this.saveToken(userEmail, accessToken, serviceIdentifier, "slack");
    }
}
