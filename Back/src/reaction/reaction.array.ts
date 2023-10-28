import { Injectable} from "@nestjs/common";
import { MailingReaction } from "src/mailing/mailing.reaction";
import { ReactionGithub } from "src/github/reactionGithub";
import { ReactionMicrosoft } from "src/microsoft/reactionMicrosoft";
import { ReactionSpotify } from "src/spotify/reactionSpotify";


@Injectable()
export class ReactionArray {
    constructor(
      private readonly mailingReaction: MailingReaction,
      private readonly githubReaction: ReactionGithub,
      private readonly reactionMicrosoft: ReactionMicrosoft,
      private readonly reactionSpotify: ReactionSpotify,
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
    };
  }
