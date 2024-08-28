import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';
import { CreateBookmarkRequestDto } from './dto/create-bookmark.request.dto';
import { GithubService } from 'src/github/github.service';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
    private githubService: GithubService,
  ) {}

  /**
   *
   * @param userId
   * @param bookmarkDto
   * @returns
   */
  async bookmarkRepository(
    userId: string,
    bookmarkDto: CreateBookmarkRequestDto,
  ): Promise<Bookmark> {
    if (await this.findBookmark(userId, bookmarkDto.repositoryId)) {
      throw new BadRequestException({
        message: 'User already bookmarked',
      });
    }

    const newBookmark = new this.bookmarkModel({
      userId,
      repositoryId: bookmarkDto.repositoryId,
      repositoryName: bookmarkDto.repositoryName,
      repositoryUrl: bookmarkDto.repositoryUrl,
    });
    return newBookmark.save();
  }

  /**
   *
   * @param userId
   * @param repositories
   * @returns
   */
  async validateAndBookmarkRepositories(
    userId: string,
    repositories: any[],
  ): Promise<any[]> {
    const validRepositories = [];

    for (const repo of repositories) {
      const repository = await this.githubService.searchRepository(
        repo.repositoryName,
      );
      if (repository && repository?.id) {
        validRepositories.push(repo);
        await this.bookmarkRepository(userId, {
          repositoryId: repository.id,
          repositoryName: repository.full_name,
          repositoryUrl: repository.html_url,
        });
      }
    }

    return validRepositories;
  }

  /**
   *
   * @param userId
   * @param repositoryId
   * @returns
   */
  async findBookmark(
    userId: string,
    repositoryId: number,
  ): Promise<Bookmark | null> {
    return this.bookmarkModel.findOne({ userId, repositoryId }).exec();
  }

  /**
   *
   * @param userId
   * @returns
   */
  async listBookmarks(userId: string): Promise<Bookmark[]> {
    return this.bookmarkModel.find({ userId }).exec();
  }

  /**
   *
   * @param userId
   * @returns
   */
  async listBookmarkChartData(userId: string): Promise<any[]> {
    return await this.bookmarkModel
      .aggregate([
        {
          $match: { userId },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ])
      .exec();
  }

  /**
   *
   * @param userId
   * @param repositoryId
   * @returns
   */
  async removeBookmark(userId: string, repositoryId: number): Promise<any> {
    return this.bookmarkModel.deleteOne({ userId, repositoryId }).exec();
  }
}
