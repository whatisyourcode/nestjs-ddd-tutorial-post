import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CommentRepository from "../../domain/repositories/comment.repository";
import CommentOrmEntity from "../entities/comment-orm.entity";
import CommentOrmMapper from "../mappers/comment-orm.mapper";
import CommentEntity from "../../domain/entities/comment.entity";
import CreateCommentEntity from "../../domain/entities/create-comment.entity";

export default class CommentRepositoryImpl implements CommentRepository {
  constructor(
    @InjectRepository(CommentOrmEntity) private readonly repository: Repository<CommentOrmEntity>,
    private readonly commentOrmMapper: CommentOrmMapper,
  ) {}

  async create(entity: CreateCommentEntity): Promise<CommentEntity> {
    const commentOrmEntity: CommentOrmEntity = this.commentOrmMapper.createEntityToOrmEntity(entity);
    const result: CommentOrmEntity = await this.repository.save(commentOrmEntity);
    const savedEntity: CommentEntity = this.commentOrmMapper.ormEntityToEntity(result);

    return savedEntity;
  }

  async findById(commentId: number): Promise<CommentEntity> {
    const ormEntity: CommentOrmEntity = await this.repository.findOne({ where: { id: commentId } });
    if (!ormEntity) {
      throw new Error("Comment not found");
    }
    const comentEntity: CommentEntity = this.commentOrmMapper.ormEntityToEntity(ormEntity);

    return comentEntity;
  }

  async findAll(postId: number): Promise<CommentEntity[]> {
    const commentOrmEntities: CommentOrmEntity[] = await this.repository.find({ where: { postId } });
    const commentEntities: CommentEntity[] = commentOrmEntities.map((commentOrmEntity) =>
      this.commentOrmMapper.ormEntityToEntity(commentOrmEntity),
    );

    return commentEntities;
  }

  async update(entity: CommentEntity): Promise<CommentEntity> {
    const ormEntity: CommentOrmEntity = this.commentOrmMapper.entityToOrmEntity(entity);
    const result: CommentOrmEntity = await this.repository.save(ormEntity);
    const commentEntity: CommentEntity = this.commentOrmMapper.ormEntityToEntity(result);

    return commentEntity;
  }

  async delete(commentId: number): Promise<void> {
    const comment: CommentOrmEntity = await this.repository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new Error("Comment not found");
    }

    await this.repository.remove(comment);
  }
}
