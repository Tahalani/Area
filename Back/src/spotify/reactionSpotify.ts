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

    async addItemToPlaylist(userService: UserServiceEntity, arg: any) {
        console.log("ADD ITEM TO PLAYLIST");
        const headers = {
            Authorization: `Bearer ${userService.token}`,
            'Content-Type': 'application/json',
        };

        const data = {
            uris: [arg.item_uri]
        };

        axios.post('https://api.spotify.com/v1/playlists/' + arg.playlist_id + '/tracks', data, { headers: headers })
            .then((response) => {
                console.log("SUCCESS: ", response.data);
            })
            .catch((error) => {
                console.log("ERROR: ", error.response.data);
        });
    }

    async deleteItemFromPlaylist(userService: UserServiceEntity, arg: any) {
        console.log("DELETE ITEM FROM PLAYLIST");
        const headers = {
            Authorization: `Bearer ${userService.token}`,
            'Content-Type': 'application/json',
        };

        const data = {
            uris: [arg.item_uri]
        };

        axios.delete('https://api.spotify.com/v1/playlists/' + arg.playlist_id + '/tracks', { headers: headers, data: data })
            .then((response) => {
                console.log("SUCCESS: ", response.data);
            })
            .catch((error) => {
                console.log("ERROR: ", error.response.data);
        });
    }

    async changePlaylistDetails(userService: UserServiceEntity, arg: any) {
        console.log("CHANGE PLAYLIST DETAILS");
        const headers = {
            Authorization: `Bearer ${userService.token}`,
            'Content-Type': 'application/json',
        };

        const data = {
            name: arg.new_playlist_name,
            description: arg.new_playlist_description
        };

        axios.put('https://api.spotify.com/v1/playlists/' + arg.playlist_id, data, { headers: headers })
            .then((response) => {
                console.log("SUCCESS: ", response.data);
            })
            .catch((error) => {
                console.log("ERROR: ", error.response.data);
        });
    }
}
