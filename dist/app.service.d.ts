import { VideoEntity } from './entities/videos.entity';
import { Repository } from 'typeorm';
import { VideoDto } from './dto/video.dto';
export declare class AppService {
    private videoRepository;
    constructor(videoRepository: Repository<VideoEntity>);
    findAll(): Promise<{
        rows: VideoEntity[];
        count: number;
    }>;
    submitVideo(video: VideoDto): Promise<any>;
    deleteVideo(videoId: string): Promise<any>;
}
