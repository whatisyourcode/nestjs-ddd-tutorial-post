import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import PostWriteRepository from "@/domains/post/domain/repositories/post-write.repository";
import PostEntity from "@/domains/post/domain/entities/post.entity";
import CreatePostEntity from "@/domains/post/domain/entities/create-post.entity";
import PostDomainToOrmMapper from "@/domains/post/infrastructure/mappers/post-domain-to-orm.mapper";
import PostOrmToDomainMapper from "@/domains/post/infrastructure/mappers/post-orm-to-domain.mapper";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";

@Injectable()
export default class PostRepositoryImpl implements PostWriteRepository {
  constructor(
    @InjectRepository(PostOrmEntity) private readonly repository: Repository<PostOrmEntity>,
    private readonly postDomainToOrmMapper: PostDomainToOrmMapper,
    private readonly postOrmToDomainMapper: PostOrmToDomainMapper,
  ) {}

  async create(entity: CreatePostEntity): Promise<PostEntity> {
    const ormEntity: PostOrmEntity = this.postDomainToOrmMapper.createDomainToOrm(entity);
    const result: PostOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: PostEntity = this.postOrmToDomainMapper.ormToDomain(result);

    return savedEntity;
  }

  async save(entity: PostEntity): Promise<PostEntity> {
    const ormEntity: PostOrmEntity = this.postDomainToOrmMapper.domainToOrm(entity);
    const result: PostOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: PostEntity = this.postOrmToDomainMapper.ormToDomain(result);

    return savedEntity;
  }

  async softRemove(entity: PostEntity): Promise<void> {
    const ormEntity: PostOrmEntity = this.postDomainToOrmMapper.domainToOrm(entity);

    await this.repository.softRemove(ormEntity);
  }

  async remove(entity: PostEntity): Promise<void> {
    const ormEntity: PostOrmEntity = this.postDomainToOrmMapper.domainToOrm(entity);

    await this.repository.remove(ormEntity);
  }
}
