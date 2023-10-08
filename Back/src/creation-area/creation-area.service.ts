import { Injectable } from '@nestjs/common';
import { areaDto } from '../dto/area.dto';
import { decode } from 'jsonwebtoken';
import { UserEntity } from '../entity/user.entity';
import { ActionEntity } from '../entity/action.entity';
import { AreaEntity } from 'src/entity/area.entity';
import { ReactionEntity } from 'src/entity/reaction.entity';
import { ActionArray } from '../dto/area.dto';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class CreationAreaService {
  async getUser(token: string): Promise<UserEntity | null> {
    const userData: any = decode(token);
    const user = await UserEntity.findOneBy({ email: userData.email });
    return user;
  }

  async getAction(actionId: number): Promise<ActionEntity | null> {
    console.log('actionId: ', actionId);
    const action = await ActionEntity.findOneBy({ id: actionId }).catch(
      (err) => {
        console.log('error get action ');
        return null;
      },
    );
    console.log('action: ', action);
    console.log('action service: ', action?.serviceId);
    return action;
  }

  async getReaction(reactionId: number): Promise<ReactionEntity | null> {
    const reaction = await ReactionEntity.findOneBy({ id: reactionId });
    return reaction;
  }

  async getUserToken(user: UserEntity, action: ActionEntity ): Promise<UserServiceEntity | null> {
    // console.log('user: ', user);
    // console.log('action: ', action);
    const userServices = await UserServiceEntity.findOneBy({
      user: { id: user.id },
      service: { id: action.serviceId },
    });
    return userServices;
  }


  async createArea(areaData: areaDto): Promise<string> {
    // TODO check auth of the client
    // console.log('area: ', areaData);
    const user: UserEntity | null = await this.getUser(areaData.token);
    if (user === null) return '42 User not found';
    const action: ActionEntity | null = await this.getAction(
      areaData.id_Action,
    );
    if (action === null) return '410 Action not found';

    const userServices = await this.getUserToken(user, action);

    const reaction: ReactionEntity | null = await this.getReaction(
      areaData.id_Reaction,
    );
    if (reaction === null) return '854 Reaction not found';

    console.log('user: ', user);
    console.log('action: ', action);
    console.log('reaction: ', reaction);
    console.log('areaData.args_action: ', areaData.argsAction);
    console.log('areaData.args_reaction: ', areaData.argsReaction);

    try {
      const area: AreaEntity = AreaEntity.create();
      area.user = user;
      area.action = action;
      area.reaction = reaction;
      area.args_action = areaData.argsAction;
      area.args_reaction = areaData.argsReaction;
      await AreaEntity.save(area);
      console.log("token === ",userServices?.token);
        console.log("action id ", action.id);
        const Action = new ActionArray
        console.log("test === ", test);
        Action.map[action.id](userServices?.token, {owner: user.name, repo: "areaTest"});
      return 'This action adds a new area';
    } catch (error) {
      console.log('error saving area: ', error);
      return 'Error saving area';

    }
  }
}
