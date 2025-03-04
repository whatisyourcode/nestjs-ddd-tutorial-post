import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";

import CommentController from "./presentation/comment.controller";
import CommentOrmEntity from "./infrastructure/entities/comment-orm.entity";
import { COMMENT_WRITE_REPOSITORY } from "./domain/repositories/comment-write.repository";
import CommentRepositoryImpl from "./infrastructure/repositories/comment-write.repository.impl";
import CommentOrmToDomainMapper from "./infrastructure/mappers/comment-orm-to-domain.mapper";
import CommentDomainToOrmMapper from "./infrastructure/mappers/comment-domain-to-orm.mapper";
import CommentDomainToDtoMapper from "./application/mappers/comment-domain-to-dto.mapper";
import CommentDtoToDomainMapper from "./application/mappers/comment-dto-to-domain.mapper";
import { COMMENT_READ_REPOSITORY } from "./domain/repositories/comment-read.repository";
import CommentReadRepositoryImpl from "./infrastructure/repositories/comment-read.repository.impl";
import CommentCreateHandler from "./application/commands/handlers/comment-create.handler";
import CommentUpdateHanlder from "./application/commands/handlers/comment-update.handler";
import CommentDeleteHandler from "./application/commands/handlers/comment-delete.handler";
import CommentGetHandler from "./application/queries/handlers/comment-get.handler";

@Module({
  imports: [TypeOrmModule.forFeature([CommentOrmEntity]), CqrsModule],
  controllers: [CommentController],
  providers: [
    CommentCreateHandler,
    CommentUpdateHanlder,
    CommentDeleteHandler,
    CommentGetHandler,
    { provide: COMMENT_WRITE_REPOSITORY, useClass: CommentRepositoryImpl },
    { provide: COMMENT_READ_REPOSITORY, useClass: CommentReadRepositoryImpl },
    CommentDtoToDomainMapper,
    CommentDomainToDtoMapper,
    CommentOrmToDomainMapper,
    CommentDomainToOrmMapper,
  ],
})
export default class CommentModule {}
