import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import PostDto from "@/domains/post/application/dtos/post.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import PostReadRepository from "@/domains/post/domain/repositories/post-read.repository";
import PostOrmToDtoMapper from "@/domains/post/infrastructure/mappers/post-orm-to-dto.mapper";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";
import PostRaw from "@/domains/post/infrastructure/raws/post.raw";
import PostPreviewRaw from "@/domains/post/infrastructure/raws/post-preview.raw";

@Injectable()
export default class PostReadRepositoryImpl implements PostReadRepository {
  constructor(
    @InjectRepository(PostOrmEntity) private readonly repository: Repository<PostOrmEntity>,
    private readonly postOrmToDtoMapper: PostOrmToDtoMapper,
  ) {}

  async getPostById(postId: number): Promise<PostDto | null> {
    const raw: PostRaw | undefined = await this.repository
      .createQueryBuilder("post")
      .leftJoin("member", "member", "post.authorId = member.id")
      .select([
        "post.id AS postId",
        "post.title AS postTitle",
        "post.content AS postContent",
        "post.createdAt AS postCreatedAt",
        "post.deletedAt AS postDeletedAt",
        "member.id AS authorUlid",
        "member.name AS authorName",
      ])
      .where("post.id = :postId", { postId })
      .getRawOne<PostRaw>();

    if (!raw) {
      return null;
    }

    const dto: PostDto = this.postOrmToDtoMapper.rawToDto(raw);

    return dto;
  }

  async getPosts(): Promise<PostPreviewDto[]> {
    const raws: PostPreviewRaw[] = await this.repository
      .createQueryBuilder("post")
      .leftJoin("member", "member", "post.authorId = member.id")
      .select([
        "post.id AS postId",
        "post.title AS postTitle",
        "post.content AS postContent",
        "post.createdAt AS postCreatedAt",
        "member.id AS authorUlid",
        "member.name AS authorName",
      ])
      .getRawMany<PostPreviewRaw>();

    const dtos: PostPreviewDto[] = raws.map((raw) => this.postOrmToDtoMapper.previewRawToDto(raw));

    return dtos;
  }
}
