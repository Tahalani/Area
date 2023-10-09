import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class ActionOutlook {
    async onPush(userService: UserServiceEntity, arg: any) {

        const octokit = new Octokit({
          auth: userService.token,
        })

        try {
          await octokit.request('POST /repos/' + userService.serviceIdentifier + '/' + arg.repo + '/hooks', {
            owner: userService.serviceIdentifier,
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
          console.log("Already created");
        }
      }
}
