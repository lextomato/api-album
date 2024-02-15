import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { VideoDto } from './dto/video.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}

  async findAll(): Promise<{ rows: VideoEntity[]; count: number }> {
    const [results, count] = await this.videoRepository
      .findAndCount()
      .catch(() => {
        throw new HttpException(
          {
            status: 'error',
            message: `Error inesperado al consultar los videos`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
    return { count: count, rows: results };
  }

  async submitVideo(video: VideoDto): Promise<any> {
    let newVideo = new VideoEntity();
    newVideo = { ...video };
    const existingVideo = await this.videoRepository.findOneBy({
      videoId: newVideo.videoId,
    });
    console.log(existingVideo);
    if (existingVideo)
      throw new HttpException(
        {
          status: 'error',
          message: 'El video ya existe.',
          video: video,
        },
        HttpStatus.CONFLICT,
      );
    else return await this.videoRepository.save(newVideo);
  }

  async deleteVideo(videoId: string): Promise<any> {
    const { affected } = await this.videoRepository
      .delete(videoId)
      .catch(() => {
        throw new HttpException(
          {
            status: 'error',
            message: `Error inesperado al intentar borrar el video`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (affected <= 0)
      throw new HttpException(
        {
          status: 'error',
          message: 'Hubo problemas para eliminar el video.',
        },
        HttpStatus.CONFLICT,
      );
    return 'Video eliminado exitosamente';
  }
}
