import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      // Customize the error response format
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = {};

        errors.forEach((error) => {
          const property = error.property;
          const constraints = error.constraints;

          // Get the first validation error for the property
          formattedErrors[property] = Object.values(constraints)[0];
        });

        return new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
