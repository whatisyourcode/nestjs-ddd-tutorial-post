export default interface PostPreviewCacheEntity {
  id: number;
  title: string;
  author: {
    ulid: string;
    name: string;
  };
  createdAt: Date;
}
