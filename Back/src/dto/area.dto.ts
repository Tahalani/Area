import { ActionGithub } from "src/github/actionGithub";

export class areaDto {
    token: string;
    id_Action: number;
    id_Reaction: number;
    argsAction: object;
    argsReaction: object;
}

const obj = new ActionGithub();

export const ActionArray: { key: number; func: (Accesstoken: string | string[] | undefined, arg: any) => void }[] = [
    { key: 1, func: obj.onPush },
  ];