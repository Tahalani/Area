import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { SpotifyService } from './spotify.service';

@Controller('api')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Get('auth/spotify')
    async spotifyAuth(@Req() req: any, @Res() res: Response) {
        const client_id = '3f5afd10c49a439085bb7ab556fd69f8';
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/spotify/callback`
        const scope = 'user-read-private user-read-email';

        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' + '&client_id=' + client_id +
            '&scope=' + scope + '&redirect_uri=' + redirect_uri
        );
    }

    @Get('auth/spotify/callback')
    async spotifyAuthCallback(@Req() req: any, @Res() res: Response) {
        this.spotifyService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }

}
