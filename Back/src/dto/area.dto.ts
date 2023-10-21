import { ActionGithub } from 'src/github/actionGithub';
import { ReactionGithub } from 'src/github/reactionGithub';
import { MailingReaction } from 'src/mailing/mailing.reaction';
import { ReactionOutlook } from 'src/outlook/reactionOutlook';
import { ReactionSpotify } from 'src/spotify/reactionSpotify';

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
    3: this.githubAction.onIssues,
    4: this.githubAction.onCreate,
  };
}

export class ReactionArray {

  private readonly GithubReaction = new ReactionGithub();
  private readonly ReactionOutlook = new ReactionOutlook();
  private readonly ReactionSpotify = new ReactionSpotify();

  map: {[key: number]: (userService: any, arg: any) => any}  = {
    1: this.GithubReaction.createIssue,
    2: this.GithubReaction.createPullRequest,
    4: this.ReactionOutlook.createEvent,
    5: this.ReactionSpotify.createPlaylist,
    6: this.ReactionSpotify.addItemToPlaylist,
    7: this.ReactionSpotify.deleteItemFromPlaylist,
    8: this.ReactionSpotify.changePlaylistDetails
  };
}
