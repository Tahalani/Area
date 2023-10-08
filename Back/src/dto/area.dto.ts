import { ActionGithub } from 'src/github/actionGithub';
import { ReactionGithub } from 'src/github/reactionGithub';
import { MailingReaction } from 'src/mailing/mailing.reaction';

export class areaDto {
  token: string;
  id_Action: number;
  id_Reaction: number;
  argsAction: object;
  argsReaction: object;
}

export class ActionArray {

  private readonly githubAction = new ActionGithub();

  map: {[key: number]: (userService: any, arg: any) => any}  = {
    1: this.githubAction.onPush,
  };
}

export class ReactionArray {

  private readonly GithubReaction = new ReactionGithub();

  map: {[key: number]: (userService: any, arg: any) => any}  = {
    1: this.GithubReaction.createIssue,
    2: this.GithubReaction.createPullRequest,
  };
}
