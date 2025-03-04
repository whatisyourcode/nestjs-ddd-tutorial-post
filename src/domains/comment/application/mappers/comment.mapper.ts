import { Injectable } from "@nestjs/common";

import CreateCommentEntity from "../../domain/entities/create-comment.entity";
import CommentEntity from "../../domain/entities/comment.entity";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { CommentDetailDto } from "../dtos/comment-detail.dto";
import { UpdateCommentDto } from "../dtos/update-comment.dto";
import UpdateCommentEntity from "../../domain/entities/update-comment.entity";
import ContentVo from "../../domain/vos/content.vo";
import e from "express";

@Injectable()
export default class CommentMapper {
  createDtoToCreateEntity(reqDto: CreateCommentDto, postId: number): CreateCommentEntity {
    const { content } = reqDto;
    const entity: CreateCommentEntity = CreateCommentEntity.create({
      content: ContentVo.create({ content }),
      postId: postId,
    });

    return entity;
  }

  updateDtoToUpdateEntity(commentId: number, reqDto: UpdateCommentDto): UpdateCommentEntity {
    const { content } = reqDto;
    const entity: UpdateCommentEntity = UpdateCommentEntity.create({
      commentId,
      content: ContentVo.create({ content }),
    });

    return entity;
  }

  commentEntityToDetailDto(entity: CommentEntity): CommentDetailDto {
    const dto: CommentDetailDto = new CommentDetailDto(
      entity.getId(),
      entity.getContentVo().getContent(),
      entity.getPostId(),
      entity.getCreatedAt(),
      entity.isDeleted(),
    );

    return dto;
  }
}
