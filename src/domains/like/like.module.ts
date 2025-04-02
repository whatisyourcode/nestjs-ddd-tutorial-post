import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import LikeController from "@/domains/like/presentation/controllers/like.controller";
import TogglePostLikeHandler from "@/domains/like/application/commands/handlers/toggle-post-like.handler";
import LikeDomainToOrmMapper from "@/domains/like/infrastructure/mappers/like-domain-to-orm.mapper";
import LikeOrmToDomainMapper from "@/domains/like/infrastructure/mappers/like-orm-to-domain.mapper";
import LikeRawToDtoMapper from "@/domains/like/infrastructure/mappers/like-raw-to-dto.mapper";
import PostLikeOrmEntity from "@/domains/like/infrastructure/entities/post-like-orm.entity";
import PostLikeReadRepository, {
  POST_LIKE_READ_REPOSITORY,
} from "@/domains/like/infrastructure/repositories/post-like-read.repository";
import PostLikeWriteRepository, {
  POST_LIKE_WRITE_REPOSITORY,
} from "@/domains/like/infrastructure/repositories/post-like-write.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PostLikeOrmEntity])],
  controllers: [LikeController],
  providers: [
    TogglePostLikeHandler,
    LikeDomainToOrmMapper,
    LikeOrmToDomainMapper,
    LikeRawToDtoMapper,
    { provide: POST_LIKE_READ_REPOSITORY, useClass: PostLikeReadRepository },
    { provide: POST_LIKE_WRITE_REPOSITORY, useClass: PostLikeWriteRepository },
  ],
})
export default class LikeModule {}
