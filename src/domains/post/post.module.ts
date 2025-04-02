import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import RedisModule from "@/cache/redis.module";

import PostController from "@/domains/post/presentation/controllers/post.controller";
import CreatePostHandler from "@/domains/post/application/commands/handlers/create-post.handler";
import GetPaginatedPostPreviewsHandler from "@/domains/post/application/queries/handlers/get-paginated-post-previews.handler";
import GetPostDetailHandler from "@/domains/post/application/queries/handlers/get-post-detail.handler";
import { POST_SERVICE } from "@/domains/post/application/services/post-service.interface";
import PostService from "@/domains/post/application/services/impl/post.service";
import PostDtoToDomainMapper from "@/domains/post/application/mappers/post-dto-to-domain.mapper";
import { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read-repository.interface";
import { POST_WRITE_REPOSITORY } from "@/domains/post/domain/repositories/post-write-repository.interface";
import { PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY } from "@/domains/post/domain/repositories/paginated-post-previews-cache-repository.interface";
import { PAGE_COUNT_CACHE_REPOSITORY } from "@/domains/post/domain/repositories/page-count-cache-repository.interface";
import PostReadRepository from "@/domains/post/infrastructure/repositories/post-read.repository";
import PostWriteRepository from "@/domains/post/infrastructure/repositories/post-write.repository";
import PaginatedPostsCacheRepository from "@/domains/post/infrastructure/repositories/paginated-post-previews-cache.repository";
import PageCountCacheRepository from "@/domains/post/infrastructure/repositories/page-count-cache.repository.";
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
    GetPaginatedPostPreviewsHandler,
    GetPostDetailHandler,
    { provide: POST_SERVICE, useClass: PostService },
    { provide: POST_READ_REPOSITORY, useClass: PostReadRepository },
    { provide: POST_WRITE_REPOSITORY, useClass: PostWriteRepository },
    { provide: PAGINATED_POST_PREVIEWS_CACHE_REPOSITORY, useClass: PaginatedPostsCacheRepository },
    { provide: PAGE_COUNT_CACHE_REPOSITORY, useClass: PageCountCacheRepository },
    PostCacheToDtoMapper,
    PostDtoToDomainMapper,
    PostDomainToOrmMapper,
    PostDtoToCacheMapper,
    PostOrmToDomainMapper,
    PostRawToDtoMapper,
  ],
})
export default class PostModule {}
