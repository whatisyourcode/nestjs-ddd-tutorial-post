import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import ILikeWriteRepository from "@/domains/like/domain/repositories/like-write-repository.interface";
import LikeEntity from "@/domains/like/domain/entities/like.entity";
import LikeDomainToOrmMapper from "@/domains/like/infrastructure/mappers/like-domain-to-orm.mapper";
import LikeOrmToDomainMapper from "@/domains/like/infrastructure/mappers/like-orm-to-domain.mapper";
import PostLikeOrmEntity from "@/domains/like/infrastructure/entities/post-like-orm.entity";

export const POST_LIKE_WRITE_REPOSITORY = Symbol("post like write repository interface");

@Injectable()
export default class PostLikeWriteRepository implements ILikeWriteRepository {
  constructor(
    @InjectRepository(PostLikeOrmEntity)
    private readonly repository: Repository<PostLikeOrmEntity>,
    private readonly likeDomainToOrmMapper: LikeDomainToOrmMapper,
    private readonly likeOrmToDomainMapper: LikeOrmToDomainMapper,
  ) {}

  async create(targetId: number, likerId: number): Promise<LikeEntity> {
    const ormEntity: PostLikeOrmEntity = this.repository.create({ postId: targetId, likerId });
    const result: PostLikeOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: LikeEntity = this.likeOrmToDomainMapper.postOrmToDomain(result);

    return savedEntity;
  }

  async remove(entity: LikeEntity): Promise<void> {
    const ormEntity: PostLikeOrmEntity = this.likeDomainToOrmMapper.domainToPostOrm(entity);

    await this.repository.remove(ormEntity);
  }

  async findOne(targetId: number, likerId: number): Promise<LikeEntity> {
    const ormEntity: PostLikeOrmEntity | null = await this.repository.findOne({
      where: { postId: targetId, likerId },
    });
    if (!ormEntity) return null;

    const entity: LikeEntity = this.likeOrmToDomainMapper.postOrmToDomain(ormEntity);

    return entity;
  }
}
