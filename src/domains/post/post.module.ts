import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import PostController from "./presentation/controllers/post.controller";
import PostMapper from "./application/mappers/post.mapper";
import { POST_SERVICE } from "@/domains/post/domain/services/post.service";
import PostServiceImpl from "./domain/services/impl/post.service.impl";
import { POST_REPOSITORY } from "./domain/repositories/post.repository";
import PostRepositoryImpl from "./infrastructure/repositories/post.repository.impl";
import { UPDATE_USECASE } from "./application/usecases/update.usecase";
import UpdateUsecaseImpl from "./application/usecases/impl/post.update.usecase.impl";
import PostOrmMapper from "./infrastructure/mappers/post-orm.mapper";
import RemoveUsecaseImpl from "./application/usecases/impl/post.remove.usecase.impl";
import CreatePostUsecaseImpl from "./application/usecases/impl/create.post.usecase.impl";
import { CREATE_POST_USECASE } from "./application/usecases/create.post.usecase";
import { POST_DETAIL_USECASE } from "./application/usecases/post.detail.usecase";
import PostDetailUseCaseImpl from "./application/usecases/impl/post.detail.usecase.impl";
import PostOrmEntity from "./infrastructure/entities/post/post-orm.entity";
import { POST_PREVIEW_USECASE } from "./application/usecases/post.preview.usecase";
import PostPreviewUseCaseImpl from "./application/usecases/impl/post.preview.usecase.impl";
import { POST_REMOVE_USECASE } from "./application/usecases/post.remove.usecase";
import PostRemoveUsecaseImpl from "./application/usecases/impl/post.remove.usecase.impl";
import { CacheModule } from "@nestjs/cache-manager";
import { POST_PREVIEW_LIST_CACHE_REPOSITORY } from "./domain/repositories/post-preview-list-cache.repository";
import PostPreviewListCacheRepositoryImpl from "./infrastructure/repositories/post-preview-list-cache.repository.impl";
import PostPreviewListCacheMapper from "./infrastructure/mappers/post-preview-list-cache.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([PostOrmEntity]), CacheModule.register()],
  controllers: [PostController],
  providers: [
    PostMapper,
    { provide: POST_DETAIL_USECASE, useClass: PostDetailUseCaseImpl },
    { provide: POST_PREVIEW_USECASE, useClass: PostPreviewUseCaseImpl },
    { provide: CREATE_POST_USECASE, useClass: CreatePostUsecaseImpl },
    { provide: UPDATE_USECASE, useClass: UpdateUsecaseImpl },
    { provide: POST_REMOVE_USECASE, useClass: PostRemoveUsecaseImpl },
    { provide: POST_SERVICE, useClass: PostServiceImpl },
    { provide: POST_REPOSITORY, useClass: PostRepositoryImpl },
    { provide: POST_PREVIEW_LIST_CACHE_REPOSITORY, useClass: PostPreviewListCacheRepositoryImpl },
    PostOrmMapper,
    PostPreviewListCacheMapper,
  ],
})
export default class PostModule {}
