import RemoveReqDto from "../dtos/post-req.dto.ts/remove-req.dto";

export const POST_REMOVE_USECASE = Symbol("post remove usecase");

export default interface PostRemoveUsecase {
    execute(removeReqDto: RemoveReqDto): Promise<void>;
}