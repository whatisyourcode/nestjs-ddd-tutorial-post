import UpdateReqDto from "../dtos/post-req.dto.ts/update-req.dto";
import PostDetailResDto from "../dtos/post-res.dto.ts/post-detail-res.dto";

export const UPDATE_USECASE = Symbol("update post usecase");

export default interface UpdateUsecase {
   execute(updateReqDto: UpdateReqDto): Promise<PostDetailResDto>;
}
