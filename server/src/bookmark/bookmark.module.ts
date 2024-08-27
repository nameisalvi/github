import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';
import { GithubModule } from 'src/github/github.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookmark.name, schema: BookmarkSchema },
    ]),
    GithubModule,
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
