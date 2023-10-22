import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class InstagramService {

    async getInfoUser(accessToken: string | string[] | undefined) : Promise<any> {

      const infoUser = await axios.get(
        `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
      ).then((res) => res.data)
      .catch((error) => {
        console.log("error get info user instagram: ", error);
      });

      return infoUser;
    }

    async saveToken(email: string, token: string, serviceName: string) {
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

        const infoUser = await this.getInfoUser(token);

        if (infoUser === undefined) {
          console.error("Error getting info user");
          return;
        }

        const userService = UserServiceEntity.create();
        userService.user = user;
        userService.service = service;
        userService.serviceIdentifier = infoUser.username;
        userService.token = token;

        try {
          await userService.save();
          console.log("User service instagram saved");
        } catch (error) {
          console.error("Error saving user service instagram: ", error);
        }
    }

    async getInstagramToken({ code }: { code: string }): Promise<string | undefined> {

        const data = {
            client_id: '700910664921744',
            client_secret: '08fc609e8e29f641ef418aceee374eee',
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.DNS_NAME}:8080/api/auth/instagram/callback`,
            code: code
          };

          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };

        let instagramToken: string = "";

        await axios.post('https://api.instagram.com/oauth/access_token', new URLSearchParams(data), config)
          .then(response => {
            instagramToken = response.data.access_token;
          })
          .catch(error => {
            console.error('Erreur de la requête :', error);
          });

        if (instagramToken === undefined) {
            console.error("Error getting instagram token");
            return;
        }
        return instagramToken;
    }

    async addService(req: any) {
        const userEmail = req.query.state;
        const code = req.query.code;
        const instagramAccesstoken = await this.getInstagramToken({ code: code });

        if (instagramAccesstoken === undefined) {
            console.error("Error getting token");
            return;
        }

        this.saveToken(userEmail, instagramAccesstoken.toString(), "instagram");
    }
}
