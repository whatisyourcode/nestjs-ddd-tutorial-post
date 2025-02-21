import { Inject } from "@nestjs/common";

import PostService, { POST_SERVICE } from "@/domains/post/domain/services/post.service";
import PostMapper from "../../mappers/post.mapper";
import PostDetailUseCase from "../post.detail.usecase";
import PostDetailResDto from "../../dtos/post-res.dto.ts/post-detail-res.dto";
import PostDetailEntity from "@/domains/post/domain/entities/post.detail.entity";
import PostDetailDto from "../../dtos/post-detail.dto";

export default class PostDetailUseCaseImpl implements PostDetailUseCase {
    constructor(@Inject(POST_SERVICE) private readonly postService: PostService,
                 private readonly postMapper: PostMapper) {}
    
    async execute(id: number): Promise<PostDetailResDto> {
        const entity: PostDetailEntity = await this.postService.getPostDetail(id);
        const postDto: PostDetailDto = this.postMapper.entityToPostDetailDto(entity);
        const postResDto: PostDetailResDto = new PostDetailResDto(postDto);

        return postResDto;
    }
}