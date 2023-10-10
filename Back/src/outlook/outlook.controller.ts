import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
// import { OutlookService } from './outlook.service';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/auth.guard';
import { OutlookService } from './outlook.service';
import axios from 'axios';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { timeStamp } from 'console';

config();

const tenant_id = 'common';


@Controller('api')
// mettre un guard
export class OutlookController {
  constructor(private readonly OutlookService: OutlookService) {}

  @ApiOkResponse({
    description: 'Endpoint to redirect to Outlook authentification',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('auth/Outlook')
  async OutlookAuth(@Req() req: any, @Res() res: Response) {
    const redirect_url = `${process.env.DNS_NAME}:8080/api/auth/Outlook/callback`;
    const userToken = req.query.token;
    res.redirect(
      `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${process.env.Microsoft_CLIENT_ID}&response_type=code&redirect_uri=${redirect_url}&response_mode=query&scope=Calendars.ReadWrite User.Read Mail.ReadWrite&state=${userToken}}`,
    );
  }

  @ApiExcludeEndpoint()
  @Get('auth/Outlook/callback')
  async OutlookAuthCallback(@Req() req: any, @Res() res: Response) {
    this.OutlookService.addService(req);
    res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
  }

  // @ApiExcludeEndpoint()
  // @Post('Webhook/Outlook')
  // // mettre un guardd
  // async OutlookWebhook(@Req() req: any, @Res() res: Response) {
  //   this.OutlookService.webhookHandling(req);
  //   res.send(req.user);
  // }
}
