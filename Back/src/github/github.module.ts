import { Module } from '@nestjs/common';
import { GitHubController } from './github.controller';
import { GitHubService } from './github.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionGithub } from './reactionGithub';
import { ActionGithub } from './actionGithub';

@Module({
  imports: [AuthModule],
  controllers: [GitHubController],
  providers: [GitHubService, ReactionGithub, ActionGithub],
})
export class GithubModule {}
