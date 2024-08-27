import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  async searchUsers(query: string): Promise<AxiosResponse> {
    const url = `https://api.github.com/search/users?q=${query}`;
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data;
  }

  async searchRepository(repositoryName: string): Promise<any> {
    const url = `https://api.github.com/repos/${repositoryName}`;
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data;
  }

  async searchRepositories(query: string): Promise<AxiosResponse> {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data;
  }

  async getUserRepositories(username: string): Promise<AxiosResponse> {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await firstValueFrom(this.httpService.get(url));

    return response.data;
  }
}
