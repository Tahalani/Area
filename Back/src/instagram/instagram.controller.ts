import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { InstagramService } from './instagram.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) {}

    // @UseGuards(AuthGuard)
    @Get('auth/instagram')
    async instagramAuth(@Req() req: any, @Res() res: Response) {
        console.log("instagramAuth");
        const app_id = '700910664921744'; // TODO: Move to .env
        const redirect_uri = `${process.env.DNS_NAME}:8080/api/auth/instagram/callback`

        res.redirect('https://api.instagram.com/oauth/authorize' +
            '?client_id=' + app_id + '&redirect_uri=' + redirect_uri +
            '&scope=user_profile,user_media' + '&response_type=code'
        );
    }

    @Get('auth/instagram/callback')
    async instagramAuthCallback(@Req() req: any, @Res() res: Response) {
        this.instagramService.addService(req);
        res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
    }
}
