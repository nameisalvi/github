import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserRequestDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:email')
  async get(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
