import { Injectable } from "@nestjs/common";

import CreatePostDto from "../dtos/create-post.dto";
import TitleVo from "../../domain/vos/title.vo";
import ContentVo from "../../domain/vos/content.vo";
import PostDetailDto from "../dtos/post-detail.dto";
import PostDetailEntity from "../../domain/entities/post.detail.entity";
import CreatePostEntity from "../../domain/entities/create.post.entity";
import PostPreviewEntity from "../../domain/entities/post.preview.entity";
import PostPreviewDto from "../dtos/post-preview.dto";

@Injectable()
export default class PostMapper {
    entityToPostDetailDto(entity: PostDetailEntity): PostDetailDto {
        const dto: PostDetailDto = new PostDetailDto(
            entity.getId(),
            entity.getTitleVo().getTitle(),
            entity.getContentVo().getContent(),
            entity.getCreatedAt(),
            entity.isDeleted()
        );
        return dto;
    }

    entityToPostPreviewDto(entity: PostPreviewEntity): PostPreviewDto {
        const dto: PostPreviewDto = new PostPreviewDto(
            entity.getId(),
            entity.getTitleVo().getTitle(),
            entity.getCreatedAt()
        );  
        return dto;
    }

    createDtoToCreateEntity(dto: CreatePostDto): CreatePostEntity {
        const { title, content } = dto; 
        const entity: CreatePostEntity = CreatePostEntity.create({
            title: TitleVo.create({ title }), 
            content: ContentVo.create({ content }),
        });
        return entity;
    }
}