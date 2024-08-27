import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import * as Papa from 'papaparse';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBookmarkRequestDto } from './dto/create-bookmark.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  /**
   * Bookmark repo.
   *
   * @param req - Request
   * @param bookmarkDto - Dto
   * @returns
   */
  @Post()
  async bookmarkRepository(
    @Request() req,
    @Body() bookmarkDto: CreateBookmarkRequestDto,
  ) {
    return await this.bookmarkService.bookmarkRepository(
      req.user.userId,
      bookmarkDto,
    );
  }

  /**
   * Import.
   *
   * @param req - Request
   * @param file - File
   * @returns
   */
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importBookmarks(
    @Request() req,
    @UploadedFile() file: any,
  ): Promise<any> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const csvData = Papa.parse(file.buffer.toString(), {
      header: true,
      skipEmptyLines: true,
    });

    const validRepositories =
      await this.bookmarkService.validateAndBookmarkRepositories(
        req.user.userId,
        csvData.data,
      );

    return {
      message: `${validRepositories.length} repositories have been bookmarked.`,
      data: validRepositories,
    };
  }

  /**
   * Get chart.
   * @param req - Request
   * @returns
   */
  @Get('chart')
  async listBookmarkChartData(@Request() req) {
    return {
      data: await this.bookmarkService.listBookmarkChartData(req.user.userId),
    };
  }

  /**
   * Get bookmarks
   * @param req - Request
   * @returns
   */
  @Get()
  async listBookmarks(@Request() req) {
    return await this.bookmarkService.listBookmarks(req.user.userId);
  }

  /**
   * Delete repo bookmark.
   *
   * @param req - Request
   * @param repositoryId - Repo id
   * @returns
   */
  @Delete(':repositoryId')
  async removeBookmark(
    @Request() req,
    @Param('repositoryId') repositoryId: number,
  ) {
    return await this.bookmarkService.removeBookmark(
      req.user.userId,
      repositoryId,
    );
  }
}
