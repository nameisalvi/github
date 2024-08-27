import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO that specify properties of a bookmark record.
 */
export class CreateBookmarkRequestDto {
  @IsDefined({ message: 'Repository id field is required' })
  @IsNotEmpty({ message: 'Repository id field will not be empty' })
  repositoryId: number;

  @IsDefined({ message: 'Repository name field is required' })
  @IsNotEmpty({ message: 'Repository name field will not be empty' })
  repositoryName: string;

  @IsDefined({ message: 'Repository Url field is required' })
  @IsNotEmpty({ message: 'Repository Url field will not be empty' })
  repositoryUrl: string;
}
