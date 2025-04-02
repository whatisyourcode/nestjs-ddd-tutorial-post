import { Injectable } from "@nestjs/common";

import LikeDto from "@/domains/like/application/dtos/like.dto";
import PostLikeRaw from "@/domains/like/infrastructure/raws/post-like.raw";

@Injectable()
export default class LikeRawToDtoMapper {
  postRawTolDto(raw: PostLikeRaw): LikeDto {
    const { postId, count, isLike } = raw;
    const formattedCount: number = Number.isNaN(Number(count)) ? 0 : Number(count);
    const formattedIsLike: boolean = Boolean(Number(isLike));
    const dto: LikeDto = new LikeDto(postId, formattedCount, formattedIsLike);

    return dto;
  }
}
