import CreateReqDto from "../dtos/post-req.dto.ts/create-req.dto";
import PostReqDto from "../dtos/post-req.dto.ts/create-req.dto";
import PostDetailResDto from "../dtos/post-res.dto.ts/post-detail-res.dto";

export const CREATE_POST_USECASE = Symbol("create post usecase");

export default interface CreatePostUsecase {
    execute(reqDto: CreateReqDto): Promise<PostDetailResDto>;
}