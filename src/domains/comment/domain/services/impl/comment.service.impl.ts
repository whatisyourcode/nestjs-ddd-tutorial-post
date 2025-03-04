import { Inject } from "@nestjs/common";

import CommentService from "../comment.service";
import CommentRepository, { COMMENT_REPOSITORY } from "../../repositories/comment.repository";
import CommentEntity from "../../entities/comment.entity";
import CreateCommentEntity from "../../entities/create-comment.entity";
import UpdateCommentEntity from "../../entities/update-comment.entity";

export default class CommentServiceImpl implements CommentService {
  constructor(@Inject(COMMENT_REPOSITORY) private readonly commentRepository: CommentRepository) {}

  async createComment(entity: CreateCommentEntity): Promise<CommentEntity> {
    const commentEntity: CommentEntity = await this.commentRepository.create(entity);

    return commentEntity;
  }

  async readComments(postId: number): Promise<CommentEntity[]> {
    const commentEntities: CommentEntity[] = await this.commentRepository.findAll(postId);

    return commentEntities;
  }

  async updateComment(entity: UpdateCommentEntity): Promise<CommentEntity> {
    const previousComment: CommentEntity = await this.commentRepository.findById(entity.getCommentId());
    previousComment.changeContent(entity.getContentVo().getContent());
    const updatedComment: CommentEntity = await this.commentRepository.update(previousComment);

    return updatedComment;
  }

  async deleteComment(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
