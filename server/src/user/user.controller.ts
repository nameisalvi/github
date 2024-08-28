import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create user.
   *
   * @param createUserDto - Dto
   * @returns
   */
  @Post()
  async create(@Body() createUserDto: CreateUserRequestDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Get user.
   * @param email - Email
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('/:email')
  async get(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
