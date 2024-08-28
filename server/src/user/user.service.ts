import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserRequestDto } from './dto/create-user.request.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   *
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserRequestDto): Promise<User> {
    if (await this.findUserByEmail(createUserDto.email)) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: {
          email: 'Email already exists',
        },
      });
    }

    const user = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return user.save();
  }

  /**
   *
   * @param email
   * @returns
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
