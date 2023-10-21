import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class SpotifyService {

    private client_id = '3f5afd10c49a439085bb7ab556fd69f8';
    private redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/spotify/callback`
    private client_secret = 'a17d908f62ed4be7a113d2413585aacb'

    async getInfoUser(accessToken: string | string[] | undefined) : Promise<any> {

        const userInfo = await axios.get(
            `https://api.spotify.com/v1/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        ).then((res) => res.data)
        .catch((error) => {
            console.log("error get info user spotify: ", error);
        });

        return userInfo;
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
        console.log("infoUser: ", infoUser);
        console.log("infoUser.id: ", infoUser.id);
        userService.serviceIdentifier = infoUser.id;
        userService.token = token;

        try {
          console.log("Saving Spotify token...");
          await userService.save();
        } catch (error) {
          console.error("Error saving token: ", error);
          return;
        }
      }

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
        const userEmail = req.query.state;
        const code = req.query.code;
        const SpotifyAccesstoken = await this.getSpotifyToken({ code: code });

        if (SpotifyAccesstoken === undefined) {
            console.error("Error getting token");
            return;
        }

        this.saveToken(userEmail, SpotifyAccesstoken.toString(), "spotify");
    }
}
