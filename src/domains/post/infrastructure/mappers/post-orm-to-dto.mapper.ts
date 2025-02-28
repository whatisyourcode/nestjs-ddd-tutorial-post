import { Injectable } from "@nestjs/common";

import PostDto from "@/domains/post/application/dtos/post.dto";
import PostPreviewDto from "@/domains/post/application/dtos/post-preview.dto";
import AuthorDto from "@/domains/post/application/dtos/author.dto";
import PostRaw from "@/domains/post/infrastructure/raws/post.raw";
import PostPreviewRaw from "@/domains/post/infrastructure/raws/post-preview.raw";

@Injectable()
export default class PostOrmToDtoMapper {
  rawToDto(raw: PostRaw): PostDto {
    const { postId, postTitle, postContent, postCreatedAt, postDeletedAt, authorUlid, authorName } = raw;
    const isPostDeleted: boolean = !!postDeletedAt;

    return new PostDto(
      postId,
      postTitle,
      postContent,
      new AuthorDto(authorUlid, authorName),
      postCreatedAt,
      isPostDeleted,
    );
  }

  previewRawToDto(raw: PostPreviewRaw): PostPreviewDto {
    const { postId, postTitle, postCreatedAt, authorUlid, authorName } = raw;

    return new PostPreviewDto(postId, postTitle, new AuthorDto(authorUlid, authorName), postCreatedAt);
  }
}
