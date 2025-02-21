import { Inject, Injectable } from "@nestjs/common";

import PostService, { POST_SERVICE } from "@/domains/post/domain/services/post.service";
import PostMapper from "../../mappers/post.mapper";
import PostEntity from "@/domains/post/domain/entities/post.detail.entity";
import PostDetailResDto from "../../dtos/post-res.dto.ts/post-detail-res.dto";
import PostDetailDto from "../../dtos/post-detail.dto";
import CreatePostEntity from "@/domains/post/domain/entities/create.post.entity";
import CreatePostUsecase from "../create.post.usecase";
import CreateReqDto from "../../dtos/post-req.dto.ts/create-req.dto";

@Injectable()
export default class CreatePostUsecaseImpl implements CreatePostUsecase {
    constructor(
        @Inject(POST_SERVICE) private readonly postService: PostService,
        private readonly postMapper: PostMapper,
    ) {}

    async execute(reqDto: CreateReqDto): Promise<PostDetailResDto> {
        const { post } = reqDto;
        const entity: CreatePostEntity = this.postMapper.createDtoToCreateEntity(post);
        const result: PostEntity = await this.postService.createPost(entity);
        const postDto: PostDetailDto = this.postMapper.entityToPostDetailDto(result);
        const resDto: PostDetailResDto = new PostDetailResDto(postDto);
        
        return resDto;
    }
}