import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { DataPullRequest} from './github.dto';
import { DataIssue } from './github.dto';

@Injectable()
export class ReactionGithub {

    async getRepo(owner: string, accessToken: string | string[] | undefined) {
        const octokit = new Octokit({
            auth: accessToken,
        })

        await octokit.request('GET /user/repos', {
            username: owner,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28'
            }
        }).then((res: any) => {
            console.log("RES: ", res.data);
            return res;
        }).catch((err: any) => {
            console.log(err);
        });
    }

    async createIssue(owner: string, data: DataIssue, accessToken: string | string[] | undefined) {
        const octokit = new Octokit({
            auth: accessToken,
        })

        await octokit.request('POST /repos/' + owner + '/' + data.repo + '/issues', {
            owner: owner,
            repo: data.repo,
            title: data.title,
            body: data.body,
            assignees: data.assignees,
            milestone: data.milestone,
            labels: data.labels,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28'
            }
        }).then((res) => {
            console.log("RES: ", res.data);
            return res;
        }).catch((err) => {
            console.log(err);
        });
    }

    async createPullRequest(owner: string, data: DataPullRequest, accessToken: string | string[] | undefined) {
        const octokit = new Octokit({
            auth: accessToken,
        })

        await octokit.request('POST /repos/' + owner + '/' + data.repo + '/pulls', {
            owner: owner,
            repo: data.repo,
            title: data.title,
            body: data.body,
            head: data.head,
            base: data.base,
            maintainer_can_modify: data.maintainer_can_modify,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'X-GitHub-Api-Version': '2022-11-28'
            }
        }).then((res: any) => {
            console.log("RES: ", res.data);
            return res;
        }).catch((err: any) => {
            console.log(err);
        });
    }
}
