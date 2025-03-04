import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import RedisModule from "@/cache/redis.module";

import PostController from "@/domains/post/presentation/controllers/post.controller";
import CreatePostHandler from "@/domains/post/application/commands/handlers/create-post.handler";
import GetPostsHandler from "@/domains/post/application/queries/handlers/get-posts.handler";
import GetPostHandler from "@/domains/post/application/queries/handlers/get-post.handler";
import { POST_SERVICE } from "@/domains/post/application/services/post.service";
import PostServiceImpl from "@/domains/post/application/services/impl/post.service.impl";
import PostDtoToDomainMapper from "@/domains/post/application/mappers/post-dto-to-domain.mapper";
import { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read.repository";
import { POST_WRITE_REPOSITORY } from "@/domains/post/domain/repositories/post-write.repository";
import { POST_PREVIEW_CACHE_REPOSITORY } from "@/domains/post/domain/repositories/post-preview-cache.repository";
import PostReadRepositoryImpl from "@/domains/post/infrastructure/repositories/post-read.repository.impl";
import PostWriteRepositoryImpl from "@/domains/post/infrastructure/repositories/post-write.repository.impl";
import PostPreviewCacheRepositoryImpl from "@/domains/post/infrastructure/repositories/post-preview-cache.repository.impl";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";
import PostCacheToDtoMapper from "@/domains/post/infrastructure/mappers/post-cache-to-dto.mapper";
import PostDomainToOrmMapper from "@/domains/post/infrastructure/mappers/post-domain-to-orm.mapper";
import PostDtoToCacheMapper from "@/domains/post//infrastructure/mappers/post-dto-to-cache.mapper";
import PostOrmToDomainMapper from "@/domains/post/infrastructure/mappers/post-orm-to-domain.mapper";
import PostRawToDtoMapper from "@/domains/post/infrastructure/mappers/post-raw-to-dto.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([PostOrmEntity]), RedisModule],
  controllers: [PostController],
  providers: [
    CreatePostHandler,
    GetPostsHandler,
    GetPostHandler,
    { provide: POST_SERVICE, useClass: PostServiceImpl },
    { provide: POST_READ_REPOSITORY, useClass: PostReadRepositoryImpl },
    { provide: POST_WRITE_REPOSITORY, useClass: PostWriteRepositoryImpl },
    { provide: POST_PREVIEW_CACHE_REPOSITORY, useClass: PostPreviewCacheRepositoryImpl },
    PostCacheToDtoMapper,
    PostDtoToDomainMapper,
    PostDomainToOrmMapper,
    PostDtoToCacheMapper,
    PostOrmToDomainMapper,
    PostRawToDtoMapper,
  ],
})
export default class PostModule {}
