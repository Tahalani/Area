import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { UserServiceEntity } from 'src/entity/userService.entity';
import { config } from 'dotenv';

config();

// prod ${process.env.DNS_NAME}:8080/api/Webhook/GitHub`
// dev url de smee https://smee.io/iDDj9mJTxmyCHTV

@Injectable()
export class ActionGithub {
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
          console.log("Already created push: ", error);
        }
      }

      async onPullReq(userService: UserServiceEntity, arg: any) {

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
              'pull_request'
            ],
            config: {
              url: `${process.env.DNS_NAME}:8080/api/Webhook/GitHub`,
              content_type: 'json',
              insecure_ssl: '0'
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        } catch (error) {
          console.log("Already created pull req: ", error);
        }
      }
      async onIssues(userService: UserServiceEntity, arg: any) {

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
              'issues'
            ],
            config: {
              url: `${process.env.DNS_NAME}:8080/api/Webhook/GitHub`,
              content_type: 'json',
              insecure_ssl: '0'
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        } catch (error) {
          console.log("Already created issues: ", error);
        }
      }
      async onCreate(userService: UserServiceEntity, arg: any) {

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
              'create'
            ],
            config: {
              url: `${process.env.DNS_NAME}:8080/api/Webhook/GitHub`,
              content_type: 'json',
              insecure_ssl: '0'
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }).then((res: any) => {console.log(res)})
        }catch (error) {
          console.log("Already created create: ", error);
        }
      }
}
