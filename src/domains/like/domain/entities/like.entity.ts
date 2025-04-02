import BaseEntity from "@/shared/entities/base.entity";

interface LikeProps {
  id: number;
  likerId: number;
  targetId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export default class LikeEntity extends BaseEntity {
  private likerId: number;
  private targetId: number;

  private constructor(
    id: number,
    likerId: number,
    targetId: number,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this.likerId = likerId;
    this.targetId = targetId;
  }

  static create({ id, likerId, targetId, createdAt, updatedAt, deletedAt }: LikeProps): LikeEntity {
    return new LikeEntity(id, likerId, targetId, createdAt, updatedAt, deletedAt);
  }

  getLikerId(): number {
    return this.likerId;
  }

  getTargetId(): number {
    return this.targetId;
  }
}
