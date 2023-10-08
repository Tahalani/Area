import { ActionGithub } from 'src/github/actionGithub';

export class areaDto {
  token: string;
  id_Action: number;
  id_Reaction: number;
  argsAction: object;
  argsReaction: object;
}


export class ActionArray {
  private readonly obj = new ActionGithub();
  map: {[key: number]: (arg0: any, arg1: any) => any}  = {
    1: this.obj.onPush,
  };
}
