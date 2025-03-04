import { Injectable } from "@nestjs/common";

import CreateCommentEntity from "../../domain/entities/comment-create.entity";
import { CreateCommentDto } from "../dtos/create-comment.dto";
import { UpdateCommentDto } from "../dtos/update-comment.dto";
import UpdateCommentEntity from "../../domain/entities/comment-update.entity";
import ContentVo from "../../domain/vos/content.vo";

@Injectable()
export default class CommentDtoToDomainMapper {
  createDtoToCreateDomain(reqDto: CreateCommentDto, postId: number): CreateCommentEntity {
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
}
