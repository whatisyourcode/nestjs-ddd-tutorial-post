import { Inject, Injectable } from "@nestjs/common";

import PostService, { POST_SERVICE } from "@/domains/post/domain/services/post.service";
import RemoveReqDto from "../../dtos/post-req.dto.ts/remove-req.dto";
import PostRemoveUsecase from "../post.remove.usecase";

@Injectable()
export default class PostRemoveUsecaseImpl implements PostRemoveUsecase {
    constructor(
        @Inject(POST_SERVICE) private readonly postService: PostService,
    ){}

    async execute(removeReqDto: RemoveReqDto): Promise<void> {
        await this.postService.removePost(removeReqDto.id);
    }
}