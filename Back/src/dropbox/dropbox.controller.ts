import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { config } from 'dotenv';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { DropboxService } from './dropbox.service';

config();

@Controller('api')
export class DropboxController {
    constructor(private readonly DropboxService: DropboxService) {}

    @Get('auth/Dropbox')
    @UseGuards(AuthGuard)
    async DropboxAuth(@Req() req: any, @Res() res: Response) {
        const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.DROPBOX_CLIENT_ID}&redirect_uri=http://localhost:8080/api/auth/dropbox/callback&response_type=code&state=${req.user.email}`;
        res.redirect(authUrl);
    }

  @Get('auth/Dropbox/callback')
  async DropboxAuthCallback(@Req() req: any, @Res() res: Response) {
    this.DropboxService.addService(req);
    res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
  }
}
