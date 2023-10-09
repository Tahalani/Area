import axios from 'axios';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ReactionOutlook } from './reactionOutlook';
import { ActionOutlook } from './actionOutlook';
import { Octokit } from '@octokit/rest';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionArray } from 'src/dto/area.dto';
import { JwtService } from '@nestjs/jwt';

config();

const jwt = require('jsonwebtoken');

async function getOutlookToken(code: string): Promise<string | string[] | undefined> {
  const response = await axios.post(
    'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    `client_id=${process.env.Microsoft_CLIENT_ID}&client_secret=${process.env.Microsoft_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.redirect_url}&grant_type=authorization_code`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return response.data.access_token;
}
export class OutlookService {
  map: { [key: string]: number } = {
    push: 1,
  };

  constructor(
    private readonly reactionGithub: ReactionOutlook,
    private readonly actionOutlook: ActionOutlook,
    private readonly jwtService: JwtService,
  ) {}

  async addService(request: any): Promise<void> {
    const token = request.query.state;
    console.log('token: ', token);
    const decode = this.jwtService.verify(token);
    // const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decode: ', decode);
    const email = decode.email;
    const code = request.query.code;
    this.saveToken(email, code, 'github');
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

    const OutlookToken = await getOutlookToken(code);
    if (OutlookToken === undefined) {
      console.error('Error getting token outlook');
      return;
    }
    try {
      const userService = UserServiceEntity.create();
      userService.user = user;
      userService.service = service;
      userService.serviceIdentifier = user.email; // TODO change
      userService.token = OutlookToken.toString();
      await userService.save();
    } catch (error) {
      console.error('Error saving token outlook');
      return;
    }
  }

  async getUserService(
    serviceIdentifier: string,
  ): Promise<UserServiceEntity | null> {
    const userService = await UserServiceEntity.findOneBy({
      serviceIdentifier: serviceIdentifier,
    });
    if (userService === null) {
      console.error('User not found (', serviceIdentifier, ')');
      return null;
    }
    return userService;
  }

  async getArea(
    userService: UserServiceEntity,
    event: string,
    repo: string,
  ): Promise<AreaEntity | null> {
    const area = await AreaEntity.find({
      where: {
        user: { id: userService.userId },
        action: { id: this.map[event] },
      },
    });

    if (area === null) {
      console.error('Area not found (', userService, event, ')');
      return null;
    }

    for (const element of area) {
      const args_action = JSON.parse(JSON.stringify(element.args_action));
      if (args_action.repo === repo) return element;
    }
    return null;
  }

  async webhookHandling(req: any): Promise<void> {
    const userService = await this.getUserService(req.body.sender.login);
    if (userService == null) {
      console.error('User not found (', req.body.sender, ')');
      return;
    }
    const area = await this.getArea(
      userService,
      req.headers['x-github-event'],
      req.body.repository.name,
    );
    console.log('areaFinal: ', area);
    if (area === null) {
      console.error(
        'Area not found (',
        userService,
        req.headers['x-github-event'],
        ')',
      );
      return;
    }
    const Reaction = new ReactionArray();
    Reaction.map[area.reactionId](userService, area.args_reaction);
  }
}
