import LikeDto from "@/domains/like/application/dtos/like.dto";

export default interface ILikeReadRepository {
  getLikesByTargetIds(targetIds: number[], memberId: number): Promise<LikeDto[]>;
}
