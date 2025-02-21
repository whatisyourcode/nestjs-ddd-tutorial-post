import { Injectable } from "@nestjs/common";
import PostRepository from "../../domain/repositories/post.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostOrmMapper from "../mappers/post-orm.mapper";
import PostOrmEntity from "../entities/post/post-orm.entity";
import CreatePostEntity from "../../domain/entities/create.post.entity";
import PostPreviewEntity from "../../domain/entities/post.preview.entity";
import PostDetailEntity from "../../domain/entities/post.detail.entity";

@Injectable()
export default class PostRepositoryImpl implements PostRepository {
    constructor(
        @InjectRepository(PostOrmEntity) private readonly repository: Repository<PostOrmEntity>,
        private readonly postOrmMapper: PostOrmMapper,
    ) {}

    async findById(id: number): Promise<PostDetailEntity | null> {
        const result: PostOrmEntity | null = await this.repository.findOne({ where : { id } });
        if (!result) {
            return null;
        }

        const entity: PostDetailEntity = this.postOrmMapper.toEntity(result);
        return entity;
    }

    async findAll(): Promise<PostPreviewEntity[]> {
        const result: PostOrmEntity[] = await this.repository.find();
        const entities: PostPreviewEntity[] = result.map((ormEntity: PostOrmEntity) => this.postOrmMapper.toPreviewEntity(ormEntity));

        return entities;
    }

    async create(entity: CreatePostEntity): Promise<PostDetailEntity> {
        const ormEntity: PostOrmEntity = this.postOrmMapper.createEntityToOrmEntity(entity);
        const result: PostOrmEntity = await this.repository.save(ormEntity);
        const savedEntity: PostDetailEntity = this.postOrmMapper.toEntity(result);
        
        return savedEntity;
    }
z
    async save(entity: PostDetailEntity): Promise<PostDetailEntity> {
        const ormEntity: PostOrmEntity = this.postOrmMapper.entityToOrmEntity(entity);
        const result: PostOrmEntity = await this.repository.save(ormEntity);
        const savedEntity: PostDetailEntity = this.postOrmMapper.toEntity(result);
        
        return savedEntity;
    }

    async softRemove(entity: PostDetailEntity): Promise<void> {
        const ormEntity: PostOrmEntity = this.postOrmMapper.entityToOrmEntity(entity);

        await this.repository.softRemove(ormEntity);
    }

    async remove(entity: PostDetailEntity): Promise<void> {
        const ormEntity: PostOrmEntity = this.postOrmMapper.entityToOrmEntity(entity); 

        await this.repository.remove(ormEntity);
    } 
}