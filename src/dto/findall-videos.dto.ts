import { VideoDto } from './video.dto';

export class FindVideosDto {
  total: number;
  data: Array<VideoDto>;
}
