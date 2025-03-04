import { Injectable } from "@nestjs/common";

import PostCreateFormDto from "@/domains/post/application/dtos/post-create-form.dto";
import PostCreateEntity from "@/domains/post/domain/entities/post-create.entity";
import TitleVo from "@/domains/post/domain/vos/title.vo";

@Injectable()
export default class MemberDtoToDomainMapper {
  createDtoToCreateDomain(dto: PostCreateFormDto, authorId: number): PostCreateEntity {
    const { title, content } = dto;
    const entity: PostCreateEntity = PostCreateEntity.create({
      title: TitleVo.create({ title }),
      content,
      authorId,
    });

    return entity;
  }
}
