export default class GetPostDetailQuery {
  readonly postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}
