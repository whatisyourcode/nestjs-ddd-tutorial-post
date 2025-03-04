export const DELETE_COMMENT_USECASE = Symbol("DELETE_COMMENT_USECASE");

export default interface DeleteCommentUsecase {
  execute(commentId: number): Promise<void>;
}
