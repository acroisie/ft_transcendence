import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'admin',
    password: 'toor',
    database: 'db',
    entities: ['src/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
