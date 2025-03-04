import AuthorCacheEntity from "@/domains/post/infrastructure/entities/author-cache.entity";

export default interface PostPreviewCacheEntity {
  id: number;
  title: string;
  author: AuthorCacheEntity;
  createdAt: Date;
}
