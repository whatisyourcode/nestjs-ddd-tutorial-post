import { Injectable } from "@nestjs/common";

import CreatePostFormDto from "@/domains/post/application/dtos/create-post-form.dto";
import CreatePostEntity from "@/domains/post/domain/entities/create-post.entity";
import TitleVo from "@/domains/post/domain/vos/title.vo";

@Injectable()
export default class PostDtoToDomainMapper {
  createDtoToCreateDomain(dto: CreatePostFormDto, authorId: number): CreatePostEntity {
    const { title, content } = dto;
    const entity: CreatePostEntity = CreatePostEntity.create({
      title: TitleVo.create({ title }),
      content,
      authorId,
    });

    return entity;
  }
}
