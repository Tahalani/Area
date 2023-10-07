import { Module } from '@nestjs/common';
import { GitHubController } from './github.controller';
import { GitHubService } from './github.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReactionGithub } from './reactionGithub';

@Module({
  imports: [AuthModule],
  controllers: [GitHubController],
  providers: [GitHubService, ReactionGithub],
})
export class GithubModule {}
