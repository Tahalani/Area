import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

config();

@Injectable()
export class NotionService {

    private client_id = process.env.NOTION_CLIENT_ID
    private redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/notion/callback`
    private client_secret = process.env.NOTION_CLIENT_SECRET

    async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
        const user = await UserEntity.findOneBy({ email: email });
        const service = await ServiceEntity.findOneBy({ name: serviceName });

        if (user === null) {
          console.error("User not found (", email, ")");
          return;
        }

        if (service === null) {
          console.error("Service not found (", serviceName, ")");
          return;
        }

        const userService = UserServiceEntity.create();
        userService.user = user;
        userService.service = service;
        userService.serviceIdentifier = serviceIdentifier;
        userService.token = token;

        try {
          console.log("Saving Notion token...");
          await userService.save();
        } catch (error) {
          console.error("Error saving token: ", error);
          return;
        }
    }


    async getNotionToken(code : string) : Promise<any | undefined> {

        const authorization = Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64')

        const headers = {
            Authorization: `Basic ${authorization}`,
            contentType: 'application/json',
        }

        const body = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirect_uri,
        }

        const notionToken = await axios.post(
            `https://api.notion.com/v1/oauth/token`,
            body,
            {
                headers: headers,
            }
        ).then((res) => res.data)
        .catch((error) => {
            console.log("error get notion token: ", error);
        });
        console.log("notionToken: ", notionToken);
        return notionToken;
    }


    async addService(req: any) {
        console.log("addService Notion");
        const userEmail = req.query.state
        const code = req.query.code
        const notionAccesstoken = await this.getNotionToken(code);

        if (notionAccesstoken === undefined) {
            console.error("Error getting token");
            return;
        }

        const accesToken = notionAccesstoken.access_token;
        const serviceIdentifier = notionAccesstoken.owner.user.name
        this.saveToken(userEmail, accesToken, serviceIdentifier, "notion");
    }
}
