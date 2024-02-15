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
exports.AppController = void 0;
const app_service_1 = require("./app.service");
const video_dto_1 = require("./dto/video.dto");
const findall_videos_dto_1 = require("./dto/findall-videos.dto");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async findAll(response) {
        const { rows, count } = await this.appService.findAll();
        const videos = new findall_videos_dto_1.FindVideosDto();
        videos.total = count;
        videos.data = rows;
        return response.status(common_1.HttpStatus.OK).json(videos);
    }
    async submitVideo(body, response) {
        const video = await this.appService.submitVideo(body);
        return response.status(common_1.HttpStatus.OK).json(video);
    }
    async deleteVideo(videoId, response) {
        const result = await this.appService.deleteVideo(videoId);
        return response.status(common_1.HttpStatus.OK).json({ result: result });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_dto_1.VideoDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "submitVideo", null);
__decorate([
    (0, common_1.Delete)(':videoId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteVideo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map