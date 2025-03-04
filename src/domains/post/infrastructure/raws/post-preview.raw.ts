export default interface PostPreviewRaw {
  readonly postId: number;
  readonly postTitle: string;
  readonly postCreatedAt: Date;
  readonly authorUlid: string;
  readonly authorName: string;
}
