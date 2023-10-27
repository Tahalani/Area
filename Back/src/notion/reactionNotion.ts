import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { UserServiceEntity } from 'src/entity/userService.entity';

@Injectable()
export class ReactionNotion {
    async createPage(userService: UserServiceEntity, arg: any) {

        const notion = new Client({
            auth: userService.token,
        });

        await notion.pages.create({
            parent: {
                page_id: arg.parent_id,
            },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: arg.title,
                            },
                        },
                    ],
                },
            },
        }).then((res) => {
            console.log('Page Notion Created')
            return res;
        }).catch((err) => {
            console.log(err);
        });
    }

    async commentPage(userService: UserServiceEntity, arg: any) {

        const notion = new Client({
            auth: userService.token,
        });

        await notion.comments.create({
            parent: {
                page_id: arg.parent_id,
            },
            rich_text: [
                {
                  text: {
                    content: arg.comment,
                  }
                }
            ]
        }).then((res) => {
            console.log('Comment Notion Created')
            return res;
        }).catch((err) => {
            console.log(err);
        });
    }
}
