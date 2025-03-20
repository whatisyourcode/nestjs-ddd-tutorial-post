import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { DataSource, DataSourceOptions } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import TypeOrmConfig from "@/shared/configs/typeorm.config";
import TransactionInitFailedException from "@/shared/exceptions/transaction-init-failed.exception";

import RedisModule from "@/cache/redis.module";
import MemberModule from "@/domains/member/member.module";
import PostModule from "@/domains/post/post.module";
import CommentModule from "@/domains/comment/comment.module";
import ImageModule from "@/domains/member/image.module";
import AppController from "@/app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "production" ? ".env.producton" : ".env.development",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
      async dataSourceFactory(options: DataSourceOptions) {
        if (!options) {
          throw new TransactionInitFailedException();
        }

        const datasource: DataSource = new DataSource(options);

        return addTransactionalDataSource(datasource);
      },
    }),
    CqrsModule.forRoot(),
    RedisModule,
    MemberModule,
    PostModule,
    CommentModule,
    ImageModule,
  ],
  controllers: [AppController],
})
export default class AppModule {}
