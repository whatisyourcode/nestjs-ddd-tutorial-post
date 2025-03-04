import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CommentOrmEntity from "../entities/comment-orm.entity";
import CommentEntity from "../../domain/entities/comment.entity";
import CreateCommentEntity from "../../domain/entities/comment-create.entity";
import CommentWriteRepository from "../../domain/repositories/comment-write.repository";
import CommentDomainToOrmMapper from "../mappers/comment-domain-to-orm.mapper";
import CommentOrmToDomainMapper from "../mappers/comment-orm-to-domain.mapper";
import CommentUpdateEntity from "../../domain/entities/comment-update.entity";

export default class CommentWrtieRepositoryImpl implements CommentWriteRepository {
  constructor(
    @InjectRepository(CommentOrmEntity) private readonly repository: Repository<CommentOrmEntity>,
    private readonly commentDomainToOrmMapper: CommentDomainToOrmMapper,
    private readonly commentOrmToDomainMapper: CommentOrmToDomainMapper,
  ) {}

  async create(entity: CreateCommentEntity): Promise<CommentEntity> {
    const commentOrmEntity: CommentOrmEntity = this.commentDomainToOrmMapper.createEntityToOrmEntity(entity);
    const result: CommentOrmEntity = await this.repository.save(commentOrmEntity);
    const savedEntity: CommentEntity = this.commentOrmToDomainMapper.ormEntityToEntity(result);

    return savedEntity;
  }

  async update(entity: CommentUpdateEntity): Promise<CommentEntity> {
    const ormEntity: CommentOrmEntity = this.commentDomainToOrmMapper.updateEntityToOrmEntity(entity);
    const result: CommentOrmEntity = await this.repository.save(ormEntity);
    const commentEntity: CommentEntity = this.commentOrmToDomainMapper.ormEntityToEntity(result);

    return commentEntity;
  }

  async remove(commentId: number): Promise<void> {
    const comment: CommentOrmEntity = await this.repository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new Error("Comment not found");
    }

    await this.repository.remove(comment);
  }
}
