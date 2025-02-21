import { Inject, Injectable } from "@nestjs/common";

import PostMapper from "../../mappers/post.mapper";
import PostService, { POST_SERVICE } from "@/domains/post/domain/services/post.service";
import PostEntity from "@/domains/post/domain/entities/post.detail.entity";
import PostPreviewUseCase from "../post.preview.usecase";
import PostListResDto from "../../dtos/post-res.dto.ts/post-list-res.dto";
import PostPreviewEntity from "@/domains/post/domain/entities/post.preview.entity";
import PostPreviewDto from "../../dtos/post-preview.dto";


@Injectable()
export default class PostPreviewUseCaseImpl implements PostPreviewUseCase {
    constructor(
        @Inject(POST_SERVICE) private readonly postService: PostService,
        private readonly postMapper: PostMapper,
    ) {}

    async execute(): Promise<PostListResDto> {
        const entity: PostPreviewEntity[] = await this.postService.getPostPreview();
        const previewDto: PostPreviewDto[] = entity.map((post: PostPreviewEntity) => this.postMapper.entityToPostPreviewDto(post));
        const resDto: PostListResDto = new PostListResDto(previewDto);

        return resDto;
    }
}           