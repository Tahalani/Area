import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserServiceEntity } from 'src/entity/userService.entity';


@Injectable()
export class ReactionSpotify {
    async createPlaylist(userService: UserServiceEntity, arg: any) {
        console.log("CREATE PLAYLIST");
        const headers = {
            Authorization: `Bearer ${userService.token}`,
            'Content-Type': 'application/json',
        };

        const data = {
            name: arg.playlist
        };

        axios.post('https://api.spotify.com/v1/users/' + userService.serviceIdentifier + '/playlists', data, { headers: headers })
            .then((response) => {
                console.log("SUCCESS: ", response.data);
            })
            .catch((error) => {
                console.log("ERROR: ", error.response.data);
            });
    }
}
