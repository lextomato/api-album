import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/videos.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [VideoEntity],
      synchronize: false,
      logging: true,
      charset: 'utf8mb4',
    }),
    TypeOrmModule.forFeature([VideoEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
