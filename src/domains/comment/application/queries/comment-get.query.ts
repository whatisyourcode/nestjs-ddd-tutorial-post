export default class CommentGetQuery {
  readonly postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}
