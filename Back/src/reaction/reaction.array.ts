import { Injectable} from "@nestjs/common";
import { MailingReaction } from "src/mailing/mailing.reaction";
import { ReactionGithub } from "src/github/reactionGithub";
import { ReactionMicrosoft } from "src/microsoft/reactionMicrosoft";
import { ReactionSpotify } from "src/spotify/reactionSpotify";
import { ReactionNotion } from "src/notion/reactionNotion";


@Injectable()
export class ReactionArray {
    constructor(
      private readonly mailingReaction: MailingReaction,
      private readonly githubReaction: ReactionGithub,
      private readonly reactionMicrosoft: ReactionMicrosoft,
      private readonly reactionSpotify: ReactionSpotify,
      private readonly reactionNotion: ReactionNotion,
    ) {}

    map: { [key: number]: (userService: any, arg: any) => any } = {
      1: this.githubReaction.createIssue,
      2: this.githubReaction.createPullRequest,
      4: this.reactionMicrosoft.createEvent,
      5: this.reactionSpotify.createPlaylist,
      6: this.reactionSpotify.addItemToPlaylist,
      7: this.reactionSpotify.deleteItemFromPlaylist,
      8: this.reactionSpotify.changePlaylistDetails,
      9: this.reactionMicrosoft.createDraft,
      10: this.reactionMicrosoft.createCalendarGroup,
      11: this.reactionMicrosoft.createCalendar,
      12: this.reactionMicrosoft.createOutlookCategory,
      13: this.reactionNotion.createPage,
      14: this.reactionNotion.commentPage,
      16: this.reactionSpotify.savePlaylist,
      17: this.reactionSpotify.removePlaylist
    };
  }
