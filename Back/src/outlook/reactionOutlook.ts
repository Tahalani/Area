import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
// import { DataPullRequest } from './outlook.dto';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class ReactionOutlook {
  async getRepo(owner: string, accessToken: string | string[] | undefined) {
    const octokit = new Octokit({
      auth: accessToken,
    });

    await octokit
      .request('GET /user/repos', {
        username: owner,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async createIssue(userService: UserServiceEntity, arg: any) {
    const octokit = new Octokit({
      auth: userService.token,
    });

    await octokit
      .request(
        'POST /repos/' +
          userService.serviceIdentifier +
          '/' +
          arg.repo +
          '/issues',
        {
          owner: userService.serviceIdentifier,
          repo: arg.repo,
          title: arg.title,
          body: arg.body,
          assignees: arg.assignees,
          milestone: arg.milestone,
          labels: arg.labels,
          headers: {
            Authorization: `Bearer ${userService.token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      )
      .then((res) => {
        console.log('RES: ', res.data);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createPullRequest(userService: UserServiceEntity, arg: any) {
    const octokit = new Octokit({
      auth: userService.token,
    });

    console.log('ARG: ', arg);
    console.log('CREATE PULL REQUEST');

    await octokit
      .request(
        'POST /repos/' +
          userService.serviceIdentifier +
          '/' +
          arg.repo +
          '/pulls',
        {
          owner: userService.serviceIdentifier,
          repo: arg.repo,
          title: arg.title,
          body: arg.body,
          head: arg.head,
          base: arg.base,
          maintainer_can_modify: true,
          headers: {
            Authorization: `Bearer ${userService.token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      )
      .then((res: any) => {
        console.log('RES PR: ', res.data);
        return res;
      })
      .catch((err: any) => {
        console.log('BAD PR: ', err);
      });
  }
}
