import { Injectable, } from '@nestjs/common';
import axios from 'axios';
import * as querystring from 'querystring';
import { config } from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { ServiceEntity } from 'src/entity/service.entity';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { ReactionGithub } from './reactionGithub';

config();


export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

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
    constructor(private readonly reactionGithub: ReactionGithub) {}
    async addService(request: any): Promise<void> {
      const userMail = request.query.state; // grace à ca on sait qui a fait la demande
      const code = request.query.code; // a voir si il faut garder code ou access token
      this.saveToken(userMail, code, 'github');
      const GitHubAccesstoken = await getGitHubToken({ code: code });

      const dataPullRequest = {
        owner: "SloWayyy",
        repo: "areaTest",
        title: "test",
        body: "test",
        head: "test",
        base: "main",
        maintainer_can_modify: true
      };
      console.log("githubaccestoken: ", GitHubAccesstoken);
      this.reactionGithub.createPullRequest("SloWayyy", dataPullRequest, GitHubAccesstoken);
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
