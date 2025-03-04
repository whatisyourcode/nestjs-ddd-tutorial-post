import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";

import CreateCommentUsecaseImpl from "./application/usecases/impl/create-comment.usecase.impl";
import { CREATE_COMMENT_USECASE } from "./application/usecases/create-comment.usecase";
import CommentMapper from "./application/mappers/comment.mapper";
import CommentController from "./presentation/comment.controller";
import CommentOrmEntity from "./infrastructure/entities/comment-orm.entity";
import CommentOrmMapper from "./infrastructure/mappers/comment-orm.mapper";
import { COMMENT_SERVICE } from "./domain/services/comment.service";
import CommentServiceImpl from "./domain/services/impl/comment.service.impl";
import { COMMENT_REPOSITORY } from "./domain/repositories/comment.repository";
import CommentRepositoryImpl from "./infrastructure/repositories/comment.repository.impl";
import { READ_COMMENT_USEACE } from "./application/usecases/read-comment.usecase";
import ReadCommentUsecaseImpl from "./application/usecases/impl/read-comment.usecase.impl";
import { UPDATE_COMMENT_USECASE } from "./application/usecases/update-comment.usecase";
import UpdateCommentUsecaseImpl from "./application/usecases/impl/update-comment.usecase.impl";
import { DELETE_COMMENT_USECASE } from "./application/usecases/delete-comment.usecase";
import DeleteCommentUsecaseImpl from "./application/usecases/impl/delete-comment.usecase.impl";

@Module({
  imports: [TypeOrmModule.forFeature([CommentOrmEntity]), CqrsModule],
  controllers: [CommentController],
  providers: [
    CommentMapper,
    { provide: CREATE_COMMENT_USECASE, useClass: CreateCommentUsecaseImpl },
    { provide: READ_COMMENT_USEACE, useClass: ReadCommentUsecaseImpl },
    { provide: UPDATE_COMMENT_USECASE, useClass: UpdateCommentUsecaseImpl },
    { provide: DELETE_COMMENT_USECASE, useClass: DeleteCommentUsecaseImpl },
    { provide: COMMENT_SERVICE, useClass: CommentServiceImpl },
    { provide: COMMENT_REPOSITORY, useClass: CommentRepositoryImpl },
    CommentOrmMapper,
  ],
})
export default class CommentModule {}
