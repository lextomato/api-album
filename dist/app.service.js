"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const videos_entity_1 = require("./entities/videos.entity");
const typeorm_2 = require("typeorm");
let AppService = class AppService {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async findAll() {
        const [results, count] = await this.videoRepository
            .findAndCount()
            .catch(() => {
            throw new common_1.HttpException({
                status: 'error',
                message: `Error inesperado al consultar los videos`,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return { count: count, rows: results };
    }
    async submitVideo(video) {
        let newVideo = new videos_entity_1.VideoEntity();
        newVideo = { ...video };
        const existingVideo = await this.videoRepository.findOneBy({
            videoId: newVideo.videoId,
        });
        console.log(existingVideo);
        if (existingVideo)
            throw new common_1.HttpException({
                status: 'error',
                message: 'El video ya existe.',
                video: video,
            }, common_1.HttpStatus.CONFLICT);
        else
            return await this.videoRepository.save(newVideo);
    }
    async deleteVideo(videoId) {
        const { affected } = await this.videoRepository
            .delete(videoId)
            .catch(() => {
            throw new common_1.HttpException({
                status: 'error',
                message: `Error inesperado al intentar borrar el video`,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
        if (affected <= 0)
            throw new common_1.HttpException({
                status: 'error',
                message: 'Hubo problemas para eliminar el video.',
            }, common_1.HttpStatus.CONFLICT);
        return 'Video eliminado exitosamente';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(videos_entity_1.VideoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map