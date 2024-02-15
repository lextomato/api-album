import { AppService } from './app.service';
import { VideoDto } from './dto/video.dto';
import { FindVideosDto } from './dto/findall-videos.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('videos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(@Res() response) {
    const { rows, count } = await this.appService.findAll();
    const videos = new FindVideosDto();
    videos.total = count;
    videos.data = rows;
    return response.status(HttpStatus.OK).json(videos);
  }

  @Post()
  async submitVideo(@Body() body: VideoDto, @Res() response) {
    const video = await this.appService.submitVideo(body);
    return response.status(HttpStatus.OK).json(video);
  }

  @Delete(':videoId')
  async deleteVideo(@Param() videoId: string, @Res() response) {
    const result = await this.appService.deleteVideo(videoId);
    return response.status(HttpStatus.OK).json({ result: result });
  }
}
