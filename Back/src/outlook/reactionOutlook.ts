import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios from 'axios';

@Injectable()
export class ReactionOutlook {
  async createEvent(userService: UserServiceEntity, arg: any) {

    const access_token = userService.token;

    const eventDetails = {
      subject: `${arg.title}`,
      start: {
        dateTime: `${arg.start}T15:00:00`,
        timeZone: 'UTC',
      },
      end: {
        dateTime: `${arg.end}T15:00:00`,
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
