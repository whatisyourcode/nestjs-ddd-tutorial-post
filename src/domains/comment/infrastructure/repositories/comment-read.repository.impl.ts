import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CommentReadRepository from "../../domain/repositories/comment-read.repository";
import CommentOrmEntity from "../entities/comment-orm.entity";
import CommentOrmToDomainMapper from "../mappers/comment-orm-to-domain.mapper";
import CommentEntity from "../../domain/entities/comment.entity";

export default class CommentReadRepositoryImpl implements CommentReadRepository {
  constructor(
    @InjectRepository(CommentOrmEntity) private readonly repository: Repository<CommentOrmEntity>,
    private readonly commentOrmToDomainMapper: CommentOrmToDomainMapper,
  ) {}

  async findById(commentId: number): Promise<CommentEntity> {
    const ormEntity: CommentOrmEntity = await this.repository.findOne({ where: { id: commentId } });
    if (!ormEntity) {
      throw new Error("Comment not found");
    }
    const comentEntity: CommentEntity = this.commentOrmToDomainMapper.ormEntityToEntity(ormEntity);

    return comentEntity;
  }

  async findAll(postId: number): Promise<CommentEntity[]> {
    const commentOrmEntities: CommentOrmEntity[] = await this.repository.find({ where: { postId } });
    const commentEntities: CommentEntity[] = commentOrmEntities.map((commentOrmEntity) =>
      this.commentOrmToDomainMapper.ormEntityToEntity(commentOrmEntity),
    );

    return commentEntities;
  }
}
