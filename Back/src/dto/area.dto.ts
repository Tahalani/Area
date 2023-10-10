import { ActionGithub } from 'src/github/actionGithub';
import { ReactionGithub } from 'src/github/reactionGithub';
import { MailingReaction } from 'src/mailing/mailing.reaction';
import { ReactionOutlook } from 'src/outlook/reactionOutlook';


export class areaDto {
  id_Action: number;
  id_Reaction: number;
  argsAction: object;
  argsReaction: object;
}

export class ActionArray {

  private readonly githubAction = new ActionGithub();

  map: {[key: number]: (userService: any, arg: any) => any}  = {
    1: this.githubAction.onPush,
    2: this.githubAction.onPullReq,
  };
}

export class ReactionArray {

  private readonly GithubReaction = new ReactionGithub();
  private readonly ReactionOutlook = new ReactionOutlook();

  map: {[key: number]: (userService: any, arg: any) => any}  = {
    1: this.GithubReaction.createIssue,
    2: this.GithubReaction.createPullRequest,
    4: this.ReactionOutlook.createEvent,
  };
}