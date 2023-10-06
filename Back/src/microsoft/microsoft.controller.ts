import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { Response } from 'express';
import { MicrosoftService } from './microsoft.service';
import { config } from 'dotenv';
import axios from 'axios';

config();

const tenant_id = 'common';
const Microsoft_CLIENT_ID = '3d597da2-59ad-4fcf-bde3-f9a8f136e01f';
const Microsoft_SCOPE_ID =
  'api://3d597da2-59ad-4fcf-bde3-f9a8f136e01f/DataAccess';
const Microsoft_CLIENT_SECRET = 'X7c8Q~x6G2Rvm.d1GFTcE_QXfEIjN97VHvBM1dr.';

// const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIzZDU5N2RhMi01OWFkLTRmY2YtYmRlMy1mOWE4ZjEzNmUwMWYiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTAxY2I0Y2EtYjg2Mi00MDI5LTkzMDYtZTVjZDBmNmQ5Zjg2L3YyLjAiLCJpYXQiOjE2OTYzNTk0MTMsIm5iZiI6MTY5NjM1OTQxMywiZXhwIjoxNjk2MzY0OTkxLCJhaW8iOiJBV1FBbS84VUFBQUFSc2o0V0d2L1RDMGdrQTEvWUp2bDFDM0FzNEdlb3VkMFp4ZGtvaFhWaXR0WWFER0dBTjhJT3B6N0NQVXo2Y2tzdnFCWGNSaUN0T0t3UnpXREdwUVRsRndNR1NkaTBpVmZuUFA0dXFURnExQzZiMWo0MWxDOVp0MzdwNHptQ2t3byIsImF6cCI6IjNkNTk3ZGEyLTU5YWQtNGZjZi1iZGUzLWY5YThmMTM2ZTAxZiIsImF6cGFjciI6IjEiLCJuYW1lIjoiSm9uYXRoYW4gWWFrYW4iLCJvaWQiOiJlY2UxOWJlNS05YzI3LTRjYjktYWZjNC1iMmZmMDk2ZDQzZDMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqb25hdGhhbi55YWthbkBlcGl0ZWNoLmV1IiwicmgiOiIwLkFYUUF5clFja0dLNEtVQ1RCdVhORDIyZmhxSjlXVDJ0V2M5UHZlUDVxUEUyNEI5MEFGcy4iLCJzY3AiOiJGb3JlY2FzdC5SZWFkIiwic3ViIjoia0Exb1RQaVVmZmY0c3RLRE12V2kzWG5hRy1FbnB3NERLYVBKNGhhdjd2WSIsInRpZCI6IjkwMWNiNGNhLWI4NjItNDAyOS05MzA2LWU1Y2QwZjZkOWY4NiIsInV0aSI6Ilk5VXdhMUV6b2s2SmRXZHo2WjlhQUEiLCJ2ZXIiOiIyLjAifQ.HWZlQSfGSIF4tL2I_icHvjLA95aWn77OOjhRVqrNLG1d0AV62m5nm4NyMQ8u_NG5Uerb04qeaHD54wDRT_bNLHio2YoT6xMz-y85TG2Q13sIbXo_i5PjaZohRo5KotxpmlN_5OWxEcATILLIYhu-4LTIEOJLVIzmBQZ1oV8PBc8W2jvwAMJtzmQX7Ya9YxhM_UeAc7fykoJcswRuNOM48FhNxCOSRW9RWOntIJ297ga7lxyMAItrqZ7Aa_uxemtyuikZfB8N5XJRoMDBo5rS81bC3OkoH96mbKLebzqZIm5XJDErmEyDmgjaNnGDyxXLwpdNTMc5du7l9CrdyQFpMA"

@Controller('api')
export class MicrosoftController {
  constructor(private readonly MicrosoftService: MicrosoftService) {}

  @Get('auth/Microsoft')
  async MicrosoftAuth(@Req() req: any, @Res() res: Response) {
    const userToken = req.query.token;
    res.redirect(
      `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/authorize?client_id=${Microsoft_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:8080/api/auth/Microsoft/callback&response_mode=query&scope=Calendars.ReadWrite User.Read Mail.ReadWrite`,
    );
  }

  @Get('auth/Microsoft/callback')
  async MicrosoftAuthCallback(@Req() req: any, @Res() res: Response) {
    console.log('JE RECOIS CALLBACK le code: ', req.query.code);

    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      `client_id=${Microsoft_CLIENT_ID}&client_secret=${Microsoft_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=http://localhost:8080/api/auth/Microsoft/callback&grant_type=authorization_code`,
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
        timeZone: 'UTC'
      },
      end: {
        dateTime: '2023-10-07T16:00:00',
        timeZone: 'UTC'
      }
    };

    const url = 'https://graph.microsoft.com/v1.0/me/events';

    axios.post(url, eventDetails, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Événement créé avec succès:', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la création de l\'événement:', error.response.data);
    })

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

    res.redirect(`http://localhost:8081/AreaPage`);
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
