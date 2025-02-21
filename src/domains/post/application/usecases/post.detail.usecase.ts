import PostDetailResDto from "../dtos/post-res.dto.ts/post-detail-res.dto";

export const POST_DETAIL_USECASE = Symbol("post detail usecase");

export default interface PostDetailUseCase {
    execute(id: number): Promise<PostDetailResDto>;
}