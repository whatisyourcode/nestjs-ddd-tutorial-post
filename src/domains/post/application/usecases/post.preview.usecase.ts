import PostListResDto from "../dtos/post-res.dto.ts/post-list-res.dto";

export const POST_PREVIEW_USECASE = Symbol("post preview usecase");

export default interface PostPreviewUseCase {
    execute(): Promise<PostListResDto>
}