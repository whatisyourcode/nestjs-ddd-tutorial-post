export default interface PostDetailRaw {
  readonly postId: number;
  readonly postTitle: string;
  readonly postContent: string;
  readonly postCreatedAt: Date;
  readonly postDeletedAt: Date;
  readonly authorUlid: string;
  readonly authorName: string;
}
