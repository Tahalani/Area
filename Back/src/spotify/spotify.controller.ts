import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SpotifyService } from './spotify.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) {}

    @UseGuards(AuthGuard)
    @Get('auth/spotify')
    async spotifyAuth(@Req() req: any, @Res() res: Response) {
        console.log("spotifyAuth");
        const client_id = '3f5afd10c49a439085bb7ab556fd69f8'; // TODO: Move to .env
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/spotify/callback`
        const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' + '&client_id=' + client_id +
            '&scope=' + scope + '&redirect_uri=' + redirect_uri + '&state=' + req.user.email
        );
    }

    @Get('auth/spotify/callback')
    async spotifyAuthCallback(@Req() req: any, @Res() res: Response) {
        this.spotifyService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
