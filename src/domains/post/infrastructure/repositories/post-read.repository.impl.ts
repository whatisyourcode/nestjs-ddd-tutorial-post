import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RECENT_PAGE_LENGTH, PAGE_SIZE } from "@/domains/post/domain/constants/post.constant";

import PostDto from "@/domains/post/application/dtos/post.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import PostReadRepository from "@/domains/post/domain/repositories/post-read.repository";
import PostRawToDtoMapper from "@/domains/post/infrastructure/mappers/post-raw-to-dto.mapper";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";
import PostRaw from "@/domains/post/infrastructure/raws/post.raw";
import PostPreviewRaw from "@/domains/post/infrastructure/raws/post-preview.raw";

@Injectable()
export default class PostReadRepositoryImpl implements PostReadRepository {
  constructor(
    @InjectRepository(PostOrmEntity) private readonly repository: Repository<PostOrmEntity>,
    private readonly postRawToDtoMapper: PostRawToDtoMapper,
  ) {}

  async getRecentPosts(pageSize: number = PAGE_SIZE): Promise<Map<number, PostPreviewDto[]>> {
    const pageLength: number = RECENT_PAGE_LENGTH;
    const limit: number = pageLength * pageSize;
    const result: Map<number, PostPreviewDto[]> = new Map<number, PostPreviewDto[]>();

    const raws: PostPreviewRaw[] = await this.repository
      .createQueryBuilder("post")
      .leftJoin("member", "member", "post.authorId = member.id")
      .select([
        "post.id AS postId",
        "post.title AS postTitle",
        "post.content AS postContent",
        "post.createdAt AS postCreatedAt",
        "member.ulid AS authorUlid",
        "member.name AS authorName",
      ])
      .orderBy("post.createdAt", "DESC")
      .limit(limit)
      .getRawMany<PostPreviewRaw>();

    const dtos: PostPreviewDto[] = raws.map((raw) => this.postRawToDtoMapper.previewRawToPreviewDto(raw));

    for (let page = 1; page <= pageLength; page++) {
      const startIndex: number = (page - 1) * pageLength;
      const endIndex: number = page * pageLength;
      const posts: PostPreviewDto[] = dtos.slice(startIndex, endIndex);
      if (posts.length === 0) {
        break;
      }

      result.set(page, dtos.slice(startIndex, endIndex));
    }

    return result;
  }

  async getPosts(page: number, pageSize: number = PAGE_SIZE): Promise<PostPreviewDto[]> {
    const raws: PostPreviewRaw[] = await this.repository
      .createQueryBuilder("post")
      .leftJoin("member", "member", "post.authorId = member.id")
      .select([
        "post.id AS postId",
        "post.title AS postTitle",
        "post.content AS postContent",
        "post.createdAt AS postCreatedAt",
        "member.ulid AS authorUlid",
        "member.name AS authorName",
      ])
      .orderBy("post.createdAt", "DESC")
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany<PostPreviewRaw>();

    const dtos: PostPreviewDto[] = raws.map((raw) => this.postRawToDtoMapper.previewRawToPreviewDto(raw));

    return dtos;
  }

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
        "member.ulid AS authorUlid",
        "member.name AS authorName",
      ])
      .where("post.id = :postId", { postId })
      .getRawOne<PostRaw>();

    if (!raw) {
      return null;
    }

    const dto: PostDto = this.postRawToDtoMapper.rawToDto(raw);

    return dto;
  }

  async getPageCount(): Promise<number> {
    const postCount: number = await this.repository.count();
    const pageSize: number = PAGE_SIZE;
    const pageCount = Math.ceil(postCount / pageSize);

    return pageCount;
  }
}
