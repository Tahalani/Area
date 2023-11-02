import { Injectable } from '@nestjs/common';
import { UserServiceEntity } from 'src/entity/userService.entity';
import axios, { Axios } from 'axios';

@Injectable()
export class ReactionGitlab {
  
  async createIssue(userService: UserServiceEntity, arg: any) {
    console.log(userService.token)
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    axios
      .post(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/issues?title=' +
          arg.title +
          '&description=' +
          arg.description,
        {},
        { headers: headers },
      )
      .then((response) => {
        console.log("Issue created");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  async deleteIssue(userService: UserServiceEntity, arg: any) {
    const headers = {
      Authorization: `Bearer ${userService.token}`,
    };
    axios
      .delete(
        'https://gitlab.com/api/v4/projects/' +
          arg.project_id +
          '/issues/' +
          arg.issue_id,
        { headers: headers },
      )
      .then((response) => {
        console.log("Issue deleted");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
