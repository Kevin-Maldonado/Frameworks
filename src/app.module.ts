import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { MentorshipsModule } from './mentorships/mentorships.module';

@Module({
  imports: [CategoriesModule, UsersModule, MentorshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
