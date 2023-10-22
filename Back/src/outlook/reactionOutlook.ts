import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

@Injectable()
export class ReactionOutlook {
  async createEvent(userService: any, arg: any) {

    console.log('userService :', userService[0].token);

    const access_token = userService[0].token;

    const eventDetails = {
      subject: `${arg.title}`,
      start: {
        dateTime: `${arg.start}T10:00:00`,
        timeZone: 'UTC',
      },
      end: {
        dateTime: `${arg.end}T17:00:00`,
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
    }

    async SendMail(userService: any, arg: any) {
      console.log('userService :', userService[0].token);
      const access_token = userService[0].token;
      const message = {
        subject: `${arg.subject}`,
        importance: 'Low',
        body: {
            contentType: 'HTML',
            content: `${arg.body}`
        },
        toRecipients: [
            {
                emailAddress: {
                    address: `${arg.to}`
                }
            }
        ]
    };
      const url = 'https://graph.microsoft.com/v1.0/me/messages';
      axios
        .post(url, message, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Mail envoyé avec succès:', response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'envoi du mail",
            error.response.data,
          );
        });
      }
}
