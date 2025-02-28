import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";

import PostController from "@/domains/post/presentation/controllers/post.controller";
import GetPostsHandler from "@/domains/post/application/queries/handlers/get-posts.handler";
import GetPostHandler from "@/domains/post/application/queries/handlers/get-post.handler";
import { POST_READ_REPOSITORY } from "@/domains/post/domain/repositories/post-read.repository";
import { POST_WRITE_REPOSITORY } from "@/domains/post/domain/repositories/post-write.repository";
import PostReadRepositoryImpl from "@/domains/post/infrastructure/repositories/post-read.repository.impl";
import PostWriteRepositoryImpl from "@/domains/post/infrastructure/repositories/post-write.repository.impl";
import PostOrmEntity from "@/domains/post/infrastructure/entities/post-orm.entity";
import AuthorCacheToDtoMapper from "@/domains/post/infrastructure/mappers/author-cache-to-dto.mapper";
import AuthorDtoToCacheMapper from "@/domains/post/infrastructure/mappers/author-dto-to-cache.mapper";
import PostCacheToDtoMapper from "@/domains/post/infrastructure/mappers/post-cache-to-dto.mapper";
import PostDtoToDomainMapper from "@/domains/post/application/mappers/post-dto-to-domain.mapper";
import PostDomainToOrmMapper from "@/domains/post/infrastructure/mappers/post-domain-to-orm.mapper";
import PostOrmToDomainMapper from "@/domains/post/infrastructure/mappers/post-orm-to-domain.mapper";
import PostOrmToDtoMapper from "@/domains/post/infrastructure/mappers/post-orm-to-dto.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([PostOrmEntity]), CacheModule.register()],
  controllers: [PostController],
  providers: [
    GetPostsHandler,
    GetPostHandler,
    { provide: POST_READ_REPOSITORY, useClass: PostReadRepositoryImpl },
    { provide: POST_WRITE_REPOSITORY, useClass: PostWriteRepositoryImpl },
    AuthorCacheToDtoMapper,
    AuthorDtoToCacheMapper,
    PostCacheToDtoMapper,
    PostDtoToDomainMapper,
    PostDomainToOrmMapper,
    PostOrmToDomainMapper,
    PostOrmToDtoMapper,
  ],
})
export default class PostModule {}
