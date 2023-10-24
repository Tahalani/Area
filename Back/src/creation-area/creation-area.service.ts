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
  async getUser(email: string): Promise<UserEntity | null> {
    const user = await UserEntity.findOneBy({ email: email });
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
    return action;
  }

  async getReaction(reactionId: number): Promise<ReactionEntity | null> {
    const reaction = await ReactionEntity.findOneBy({ id: reactionId });
    return reaction;
  }

  async getUserService(user: UserEntity, action: ActionEntity ): Promise<UserServiceEntity | null> {

    const userServices = await UserServiceEntity.findOneBy({
      user: { id: user.id },
      service: { id: action.serviceId },
    }).catch((err) => {
      console.log('error get user service action');
      return null;
    });
    return userServices;
  }

  async getUserServiceReaction(user: UserEntity, reaction: ReactionEntity ): Promise<UserServiceEntity | null> {

    const userServices = await UserServiceEntity.findOneBy({
      user: { id: user.id },
      service: { id: reaction.serviceId },
    }).catch((err) => {
      console.log('error get user service reaction');
      return null;
    });
    return userServices;
  }

  async HasMicrosoftAction(user: UserEntity) : Promise<AreaEntity[]>{
    const areaEntity = await AreaEntity.createQueryBuilder("area")
    .leftJoinAndSelect("area.action", "action")
    .where("action.id = :actionId", { actionId: 5 })
    .andWhere("area.user.id = :userId", { userId: user.id })
    .getMany();

    return areaEntity;
  }

  async createArea(areaData: areaDto, req: any): Promise<string> {

    const user: UserEntity | null = await this.getUser(req.user.email);
    if (user === null)
      return '409 User not found';

    const action: ActionEntity | null = await this.getAction(areaData.id_Action);
    if (action === null)
      return '410 Action not found';

    const reaction: ReactionEntity | null = await this.getReaction(areaData.id_Reaction);
    if (reaction === null)
      return '854 Reaction not found';


    try {
      const area: AreaEntity = AreaEntity.create();
      area.user = user;
      area.action = action;
      area.reaction = reaction;
      area.args_action = areaData.argsAction;
      area.args_reaction = areaData.argsReaction;

      const UserService = await this.getUserService(user, action);
      if (areaData.id_Action == 5 && ((await this.HasMicrosoftAction(user)).length > 0)) {
        await AreaEntity.save(area);
        return 'Area created but you already have a microsoft webhook';
      }
      await AreaEntity.save(area);
      const Action = new ActionArray
      Action.map[action.id](UserService, areaData.argsAction);
      return 'This action adds a new area';
    } catch (error) {
      console.log('error saving area: ', error);
      return 'Error saving area';
    }
  }
}
