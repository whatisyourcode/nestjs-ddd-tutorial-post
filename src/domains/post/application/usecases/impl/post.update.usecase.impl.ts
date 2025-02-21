import { Inject, Injectable } from "@nestjs/common";

import UpdateUsecase from "../update.usecase";
import PostService, { POST_SERVICE } from "@/domains/post/domain/services/post.service";
import PostMapper from "../../mappers/post.mapper";
import PostEntity from "@/domains/post/domain/entities/post.detail.entity";
import UpdateReqDto from "../../dtos/post-req.dto.ts/update-req.dto";
import PostDetailResDto from "../../dtos/post-res.dto.ts/post-detail-res.dto";
import PostDetailDto from "../../dtos/post-detail.dto";

@Injectable()
export default class UpdateUsecaseImpl implements UpdateUsecase {
    constructor(@Inject(POST_SERVICE) private readonly postService: PostService,
                private readonly postMapper: PostMapper) {}
    
    async execute(updateReqDto: UpdateReqDto): Promise<PostDetailResDto> {
        const { post } = updateReqDto;
        const entity: PostEntity = await this.postService.getPostDetail(post.id);
        entity.changeTitle(post.title);
        entity.changeContent(post.content);
        
        const updatedEntity: PostEntity = await this.postService.updatePost(entity);
        const postDto: PostDetailDto = this.postMapper.entityToPostDetailDto(updatedEntity);
        const postResDto: PostDetailResDto = new PostDetailResDto(postDto);

        return postResDto;
    }
}