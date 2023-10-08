import { Injectable } from '@nestjs/common';
import { OnPush } from './github.dto';
import { Octokit } from '@octokit/rest';

@Injectable()
export class ActionGithub {
    async onPush(GitHubAccesstoken: string | string[] | undefined, arg: OnPush) {

        const octokit = new Octokit({
          auth: GitHubAccesstoken,
        })

        try {
          await octokit.request('POST /repos/' + arg.owner + '/' + arg.repo + '/hooks', {
            owner: arg.owner,
            repo: arg.repo,
            name: 'web',
            active: true,
            events: [
              'push',
              'pull_request'
            ],
            config: {
              url: 'https://smee.io/iDDj9mJTxmyCHTV',
              content_type: 'json',
              insecure_ssl: '0'
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        } catch (error) {
          console.log("Failed to create webhook");
        }
      }
}
