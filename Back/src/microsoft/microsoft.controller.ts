import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
import { MicrosoftService } from './microsoft.service';
import { config } from 'dotenv';
import axios from 'axios';

config();

const tenant_id = 'common';

@Controller('api')
export class MicrosoftController {
  constructor(private readonly MicrosoftService: MicrosoftService) {}

  @Get('auth/Microsoft')
  async MicrosoftAuth(@Req() req: any, @Res() res: Response) {
    const userToken = req.query.token;
    res.redirect(
      `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${process.env.Microsoft_CLIENT_ID}&response_type=code&redirect_uri=http://163.172.134.80:8080/api/auth/Microsoft/callback&response_mode=query&scope=Calendars.ReadWrite User.Read Mail.ReadWrite`,
    );
  }

  @Get('auth/Microsoft/callback')
  async MicrosoftAuthCallback(@Req() req: any, @Res() res: Response) {
    console.log('JE RECOIS CALLBACK le code: ', req.query.code);

    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      // `client_id=${Microsoft_CLIENT_ID}&client_secret=${Microsoft_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=http://163.172.134.80:8080/api/auth/Microsoft/callback&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('Réponse :', response.data);
    const access_token = response.data.access_token;

    const eventDetails = {
      subject: 'Réunion importante PSK MEHDI IL EST TROP RELOU ',
      start: {
        dateTime: '2023-10-07T15:00:00',
        timeZone: 'UTC',
      },
      end: {
        dateTime: '2023-10-07T16:00:00',
        timeZone: 'UTC',
      },
    };

    const url = 'https://graph.microsoft.com/v1.0/me/events';

    axios
      .post(url, eventDetails, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Événement créé avec succès:', response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la création de l'événement:",
          error.response.data,
        );
      });

    // const createSubscription = async (accessToken: any) => {
    //   console.log("je suis dans createSubscription")
    //   const subscriptionEndpoint = 'https://graph.microsoft.com/v1.0/subscriptions';

    //   const payload = {
    //     changeType: 'created',
    //     notificationUrl: 'https://smee.io/y4LBo2kcBp4JnPcT', // L'URL où Microsoft enverra les notifications
    //     resource: '/me/mailFolders(\'inbox\')/messages',
    //     expirationDateTime: '2023-10-07T23:59:00.000Z', // Date d'expiration de l'abonnement
    //   };

    //   try {
    //     const response = await axios.post(subscriptionEndpoint, payload, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     console.log('Abonnement créé avec succès:', response.data);
    //     return response.data;
    //   } catch (error) {
    //     console.log('Erreur lors de la création de l\'abonnement:', error.response.data);
    //     return error;
    //   }
    // };
    // await createSubscription(access_token);

    //   console.log('Réponse :', response.data);
    // } catch (error) {
    //   console.error('Erreur :', error);
    // }

    res.redirect(`https://are4-51.com:8081/AreaPage`);
  }

  @Post('WebHook/Microsoft')
  async MicrosoftWebhook(@Req() req: any, @Res() res: Response) {
    try {
      console.log('je recois un truc la ??', req);
      if (req.query.validationToken) {
        console.log("Requête de validation d'abonnement reçue.");
        res.status(200).send(req.query.validationToken);
      }
      console.log('JE RECOIS WEBHOOK: ', req);
      res.send(req.user);
    } catch (error) {
      console.error('Erreur lors de la gestion du webhook Microsoft:', error);
      res.status(500).send("Une erreur s'est produite");
    }
  }
}
