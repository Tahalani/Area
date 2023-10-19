import { Injectable, } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ReactionGithub } from './reactionGithub';
import { ActionGithub } from './actionGithub';
import { Octokit } from '@octokit/rest';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionArray } from 'src/dto/area.dto';

config();

const jwt = require('jsonwebtoken');

async function getGitHubToken({ code }: { code: string }): Promise<string | string[] | undefined> {
  const githubToken = await axios
  .post(
    `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
    const decoded = querystring.parse(githubToken);
    const accessToken = decoded.access_token;
    return accessToken;
  }


  @Injectable()
  export class GitHubService {

    map: {[key: string]: number}  = {
      push: 1,
      pull: 2,
      issues: 3,
    };

    constructor(private readonly reactionGithub: ReactionGithub, private readonly actionGithub: ActionGithub) {}

    async getInfoUser(accessToken: string | string[] | undefined) {
      const octokit = new Octokit({
          auth: accessToken,
      })

      const info = await octokit.request('GET /user', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          }
      }).then((res: any) => {
          return res.data;
      }).catch((err: any) => {
          console.log(err);
      });
      return info;
  }

    async addService(request: any): Promise<void> {
      const userMail = request.query.state; // grace à ca on sait qui a fait la demande
      const code = request.query.code; // a voir si il faut garder code ou access token
      console.log("code: ", code);
      const GitHubAccesstoken = await getGitHubToken({ code: code });
      console.log("GitHubAccesstoken: ", GitHubAccesstoken);
      if (GitHubAccesstoken === undefined) {
        console.error("Error getting token");
        return;
      }
      this.saveToken(userMail, GitHubAccesstoken.toString(), "github");
    }

    private async saveToken(email: string, token: string, serviceName: string) {
      const user = await UserEntity.findOneBy({ email: email });
      const service = await ServiceEntity.findOneBy({ name: serviceName });
      if (user === null) {
        console.error("User not found (", email, ")");
        return;
      }
      if (service === null) {
        console.error("Service not found (", serviceName, ")");
        return;
      }

      const infoUser = await this.getInfoUser(token);

      const userService = UserServiceEntity.create();
      userService.user = user;
      userService.service = service;
      userService.serviceIdentifier = infoUser.login;
      userService.token = token;

      try {
        await userService.save();
      } catch (error) {
        console.error("Error saving token");
        return;
      }
    }

    async getUserService(serviceIdentifier: string): Promise<UserServiceEntity | null> {
      const userService = await UserServiceEntity.findOneBy({ serviceIdentifier: serviceIdentifier });
      if (userService === null) {
        console.error("User not found (", serviceIdentifier, ")");
        return null;
      }
      return userService;
    }

    async getArea(userService: UserServiceEntity, event: string, repo: string): Promise<AreaEntity | null> {
      const area = await AreaEntity.find({
        where: {
          user: {id: userService.userId },
          action: { id: this.map[event] },
        }
      });

      if (area === null) {
        console.error("Area not found (", userService, event, ")");
        return null;
      }

      for (const element of area) {
        const args_action = JSON.parse(JSON.stringify(element.args_action));
        if (args_action.repo === repo)
          return element;
      }
      return null;
    }

    async webhookHandling(req: any): Promise<void> {
      const userService = await this.getUserService(req.body.sender.login);
      if (userService == null) {
        console.error("User not found (", req.body.sender, ")");
        return;
      }
      const area = await this.getArea(userService, req.headers['x-github-event'], req.body.repository.name);
      console.log("areaFinal: ", area);
      if (area === null) {
        console.error("Area not found (", userService, req.headers['x-github-event'], ")");
        return;
      }
      if (area.reactionId === 4) {
        console.log("je rentre la: ", area.reactionId)
        const userService2 = await UserServiceEntity.find({ where: { user: { id: userService.userId }, service: { id: 4 } } });
        const Reaction = new ReactionArray
        Reaction.map[area.reactionId](userService2, area.args_reaction);
        return;
      }
      const Reaction = new ReactionArray
      Reaction.map[area.reactionId](userService, area.args_reaction);
    }
}
