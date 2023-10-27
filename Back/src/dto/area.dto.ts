import { ActionGithub } from 'src/github/actionGithub';
import { ReactionGithub } from 'src/github/reactionGithub';
import { MailingReaction } from 'src/mailing/mailing.reaction';
import { ReactionMicrosoft } from 'src/microsoft/reactionMicrosoft';
import { ReactionSpotify } from 'src/spotify/reactionSpotify';
import {ActionMicrosoft} from 'src/microsoft/actionMicrosoft';
import { ReactionNotion } from 'src/notion/reactionNotion';

export class areaDto {
  id_Action: number;
  id_Reaction: number;
  argsAction: object;
  argsReaction: object;
}

export class ActionArray {
  private readonly githubAction = new ActionGithub();
  private readonly microsoftAction = new ActionMicrosoft();


  map: { [key: number]: (userService: any, arg: any) => any } = {
    1: this.githubAction.onPush,
    2: this.githubAction.onPullReq,
    3: this.githubAction.onIssues,
    4: this.githubAction.onCreate,
    5: this.microsoftAction.onReceiveMail,
  };
}

export class ReactionArray {
  private readonly GithubReaction = new ReactionGithub();
  private readonly ReactionMicrosoft = new ReactionMicrosoft();
  private readonly ReactionSpotify = new ReactionSpotify();
  private readonly ReactionNotion = new ReactionNotion();

  map: { [key: number]: (userService: any, arg: any) => any } = {
    1: this.GithubReaction.createIssue,
    2: this.GithubReaction.createPullRequest,
    4: this.ReactionMicrosoft.createEvent,
    5: this.ReactionSpotify.createPlaylist,
    6: this.ReactionSpotify.addItemToPlaylist,
    7: this.ReactionSpotify.deleteItemFromPlaylist,
    8: this.ReactionSpotify.changePlaylistDetails,
    9: this.ReactionMicrosoft.createDraft,
    10: this.ReactionMicrosoft.createCalendarGroup,
    11: this.ReactionMicrosoft.createCalendar,
    12: this.ReactionMicrosoft.createOutlookCategory,
    13: this.ReactionNotion.createPage,
    14: this.ReactionNotion.commentPage,
  };
}
