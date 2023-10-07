import { Injectable, } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ReactionGithub } from './reactionGithub';
import { ActionGithub } from './actionGithub';
import { DataPullRequest, OnPush, GitHubUser } from './github.dto';
import { decode } from 'jsonwebtoken';

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
    constructor(private readonly reactionGithub: ReactionGithub, private readonly actionGithub: ActionGithub) {}
    async addService(request: any): Promise<void> {
      const userMail = request.query.state; // grace à ca on sait qui a fait la demande
      const code = request.query.code; // a voir si il faut garder code ou access token
      this.saveToken(userMail, code, 'github');
      const GitHubAccesstoken = await getGitHubToken({ code: code });
      // const dataPullRequest: DataPullRequest = {
      //   owner: 'Slowayyy',
      //   repo: "areaTest",
      //   title: "test",
      //   body: "test",
      //   head: "test",
      //   base: "main",
      //   maintainer_can_modify: true
      // }

      // this.reactionGithub.createPullRequest("Slowayyy", dataPullRequest, GitHubAccesstoken);

      const info = await this.reactionGithub.getInfoUser(GitHubAccesstoken);

      console.log("INFO: ", info);

      const onPush : OnPush = {
        owner: info.login,
        repo: "areaTest"
      }

      this.actionGithub.onPush(GitHubAccesstoken, onPush);

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
      const userService = UserServiceEntity.create();
      userService.user = user;
      userService.service = service;
      userService.token = token;
      try {
        await userService.save();
      } catch (error) {
        console.error("Error saving token");
        return;
      }
    }
}
