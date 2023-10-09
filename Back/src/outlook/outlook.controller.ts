import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
// import { OutlookService } from './outlook.service';
import { config } from 'dotenv';
import { AuthGuard } from 'src/auth/auth.guard';
import axios from 'axios';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

config();

const tenant_id = 'common';
const Microsoft_CLIENT_ID = '3d597da2-59ad-4fcf-bde3-f9a8f136e01f';
const Microsoft_SCOPE_ID =
  'api://3d597da2-59ad-4fcf-bde3-f9a8f136e01f/DataAccess';
const Microsoft_CLIENT_SECRET = 'X7c8Q~x6G2Rvm.d1GFTcE_QXfEIjN97VHvBM1dr.';


@Controller('api')
// mettre un guard
export class OutlookController {
  // constructor(private readonly OutlookService: OutlookService) {}

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
      `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${Microsoft_CLIENT_ID}&response_type=code&redirect_uri=${redirect_url}&response_mode=query&scope=Calendars.ReadWrite User.Read Mail.ReadWrite&state=${userToken}}`,
    );
  }

  @ApiExcludeEndpoint()
  @Get('auth/Outlook/callback')
  async OutlookAuthCallback(@Req() req: any, @Res() res: Response) {
    console.log('JE RECOIS CALLBACK le code: ', req);

    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      `client_id=${Microsoft_CLIENT_ID}&client_secret=${Microsoft_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=http://163.172.134.80:8080/api/auth/Microsoft/callback&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('Réponse :', response.data);
    // this.OutlookService.addService(req);
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
