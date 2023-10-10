import { ActionGithub } from 'src/github/actionGithub';
import { ReactionGithub } from 'src/github/reactionGithub';
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
  };
}

export class ReactionArray {

  private readonly GithubReaction = new ReactionGithub();
  private readonly OutlookReaction = new ReactionOutlook();


  map: {[key: number]: (userService: any, arg: any) => any}  = {
    1: this.GithubReaction.createIssue,
    2: this.GithubReaction.createPullRequest,
    4: this.OutlookReaction.createEvent,
  };
}
