import { AppService } from './app.service';
import { VideoDto } from './dto/video.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    findAll(response: any): Promise<any>;
    submitVideo(body: VideoDto, response: any): Promise<any>;
    deleteVideo(videoId: string, response: any): Promise<any>;
}
