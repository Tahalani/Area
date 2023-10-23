import axios from 'axios';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ReactionMicrosoft } from './reactionMicrosoft';
import { ActionMicrosoft } from './actionMicrosoft';
import { JwtService } from '@nestjs/jwt';

config();

const jwt = require('jsonwebtoken');

async function getmicrosoftToken(
  code: string,
): Promise<string | undefined | string[]> {
  try {
    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      `client_id=${process.env.Microsoft_CLIENT_ID}&client_secret=${process.env.Microsoft_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.DNS_NAME}:8080/api/auth/Microsoft/callback&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token microsoft');
    return undefined;
  }
}

async function getmicrosoftUserId(token: string): Promise<string | undefined> {
  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.id;
  } catch (error) {
    return error;
  }
}

export class MicrosoftService {
  map: { [key: string]: number } = {
    push: 1,
  };

  constructor(
    private readonly reactionGithub: ReactionMicrosoft,
    private readonly actionmicrosoft: ActionMicrosoft,
    private readonly jwtService: JwtService,
  ) {}

  async addService(request: any): Promise<void> {
    const email = request.query.state;
    const code = request.query.code;
    this.saveToken(email, code, 'microsoft');
  }

  private async saveToken(email: string, code: string, serviceName: string) {
    const user = await UserEntity.findOneBy({ email: email });
    const service = await ServiceEntity.findOneBy({ name: serviceName });
    if (user === null) {
      console.error('User not found (', email, ')');
      return;
    }
    if (service === null) {
      console.error('Service not found (', serviceName, ')');
      return;
    }

    const microsoftToken = await getmicrosoftToken(code);
    if (microsoftToken === undefined) {
      console.error('Error getting token microsoft');
      return;
    }
    const microsoftUserId = await getmicrosoftUserId(microsoftToken.toString());
    if (microsoftUserId === undefined) {
      console.error('Error getting user id microsoft');
      return;
    }
    try {
      const userService = UserServiceEntity.create();
      userService.user = user;
      userService.service = service;
      userService.serviceIdentifier = microsoftUserId;
      userService.token = microsoftToken.toString();
      console.log(
        'microsoft token: ',
        userService.token,
        'microsoft user id: ',
        userService.serviceIdentifier,
        'microsoft user: ',
        userService.user,
        'microsoft service: ',
        userService.service,
      );
      await userService.save();
      console.log('microsoft token saved');
    } catch (error) {
      console.error('Error saving token microsoft');
      return;
    }
  }
}
