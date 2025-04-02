import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import LikeDto from "@/domains/like/application/dtos/like.dto";
import ILikeReadRepository from "@/domains/like/domain/repositories/like-read-repository.interface";
import LikeRawToDtoMapper from "@/domains/like/infrastructure/mappers/like-raw-to-dto.mapper";
import PostLikeOrmEntity from "@/domains/like/infrastructure/entities/post-like-orm.entity";
import PostLikeRaw from "@/domains/like/infrastructure/raws/post-like.raw";

export const POST_LIKE_READ_REPOSITORY = Symbol("post like read repository interface");

@Injectable()
export default class PostLikeReadRepository implements ILikeReadRepository {
  constructor(
    @InjectRepository(PostLikeOrmEntity)
    private readonly repository: Repository<PostLikeOrmEntity>,
    private readonly likeRawToDtoMapper: LikeRawToDtoMapper,
  ) {}

  async getLikesByTargetIds(targetIds: number[], memberId: number): Promise<LikeDto[]> {
    const raws: PostLikeRaw[] = await this.repository
      .createQueryBuilder("like")
      .select("like.postId", "postId")
      .addSelect("COUNT(like.id)", "count")
      .addSelect(
        `CASE WHEN SUM(CASE WHEN like.likerId = :memberId THEN 1 ELSE 0 END) > 0 THEN true ELSE false END`,
        "isLike",
      )
      .where("like.postId IN (:...targetIds)", { targetIds })
      .groupBy("like.postId")
      .setParameter("memberId", memberId)
      .getRawMany<PostLikeRaw>();

    const dtos: LikeDto[] = raws.map((raw) => this.likeRawToDtoMapper.postRawTolDto(raw));

    return dtos;
  }
}
