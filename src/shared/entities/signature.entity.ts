import BaseEntity from "@/shared/entities/base.entity";

export default abstract class SignatureEntity extends BaseEntity {
  private readonly _ulid: string;

  constructor(id: number, ulid: string, createdAt: Date, updatedAt: Date | null, deletedAt: Date | null) {
    super(id, createdAt, updatedAt, deletedAt);
    this._ulid = ulid;
  }

  getUlid(): string {
    return this._ulid;
  }
}
