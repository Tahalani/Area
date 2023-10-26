import { Injectable } from "@nestjs/common";
import { MailingReaction } from "src/mailing/mailing.reaction";
import { ActionGithub } from "src/github/actionGithub";
import { ActionMicrosoft } from "src/microsoft/actionMicrosoft";

@Injectable()
export class ActionArray {
    constructor(
      private readonly mailingReaction: MailingReaction,
      private readonly githubAction: ActionGithub,
      private readonly microsoftAction: ActionMicrosoft,
    ) {}
  
    map: { [key: number]: (userService: any, arg: any) => any } = {
      1: this.githubAction.onPush,
      2: this.githubAction.onPullReq,
      3: this.githubAction.onIssues,
      4: this.githubAction.onCreate,
      5: this.microsoftAction.onReceiveMail,
    };
  }