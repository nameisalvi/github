import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('github')
@UseGuards(JwtAuthGuard)
export class GithubController {
  constructor(private githubService: GithubService) {}

  /**
   * Search users.
   *
   * @param query - Query
   * @returns - Users
   */
  @Get('search/users')
  async searchUsers(@Query('query') query: string) {
    return await this.githubService.searchUsers(query);
  }

  /**
   * Search repositories.
   *
   * @param query - Query
   * @returns - Repository
   */
  @Get('search/repositories')
  async searchRepositories(@Query('query') query: string) {
    return await this.githubService.searchRepositories(query);
  }

  /**
   * User repositories.
   *
   * @param username - Username
   * @returns - Repositories.
   */
  @Get('users/:username/repositories')
  async getUserRepositories(@Param('username') username: string) {
    return await this.githubService.getUserRepositories(username);
  }
}
