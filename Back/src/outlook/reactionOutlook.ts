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
}
