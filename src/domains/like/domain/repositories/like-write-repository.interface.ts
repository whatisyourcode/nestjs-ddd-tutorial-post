import LikeEntity from "@/domains/like/domain/entities/like.entity";

export default interface ILikeWriteRepository {
  create(targetId: number, likerId: number): Promise<LikeEntity>;
  remove(entity: LikeEntity): Promise<void>;
  findOne(targetId: number, likerId: number): Promise<LikeEntity>;
}
