import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import TypeOrmConfig from "@/shared/configs/typeorm.config";
import redisConfig from "@/shared/configs/redis.config";
import TransactionInitFailedException from "@/shared/exceptions/transaction-init-failed.exception";

import MemberModule from "@/domains/member/member.module";
import PostModule from "@/domains/post/post.module";
import AppController from "@/app.controller";
import CommentModule from "./domains/comment/comment.module";

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: redisConfig,
      isGlobal: true,
    }),
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
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     store: redisStore,
    //     host: configService.get<string>("REDIS_HOST",'localhost'),
    //     port: configService.get<number>("REDIS_PORT", 6379),
    //     ttl: 60,
    //   }),
    //   inject: [ConfigService],
    // }),
    MemberModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
})
export default class AppModule {}
