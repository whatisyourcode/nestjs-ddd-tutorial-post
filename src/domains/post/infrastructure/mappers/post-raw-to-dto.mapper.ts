import { Injectable } from "@nestjs/common";

import PostDto from "@/domains/post/application/dtos/post.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import AuthorDto from "@/domains/post/application/dtos/author.dto";
import PostRaw from "@/domains/post/infrastructure/raws/post.raw";
import PostPreviewRaw from "@/domains/post/infrastructure/raws/post-preview.raw";

@Injectable()
export default class PostRawToDtoMapper {
  rawToDto(raw: PostRaw): PostDto {
    const { postId, postTitle, postContent, postCreatedAt, postDeletedAt, authorUlid, authorName } = raw;
    const isPostDeleted: boolean = !!postDeletedAt;
    const dto: PostDto = new PostDto(
      postId,
      postTitle,
      postContent,
      new AuthorDto(authorUlid, authorName),
      postCreatedAt,
      isPostDeleted,
    );

    return dto;
  }

  previewRawToPreviewDto(raw: PostPreviewRaw): PostPreviewDto {
    const { postId, postTitle, postCreatedAt, authorUlid, authorName } = raw;
    const dto: PostPreviewDto = new PostPreviewDto(
      postId,
      postTitle,
      new AuthorDto(authorUlid, authorName),
      postCreatedAt,
    );

    return dto;
  }
}
