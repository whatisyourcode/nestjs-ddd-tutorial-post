export default abstract class BaseEntity {
  private readonly _id: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date | null;
  private readonly _deletedAt: Date | null;

  constructor(id: number, createdAt: Date, updatedAt: Date | null, deletedAt: Date | null) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }

  getId(): number {
    return this._id;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date | null {
    return this._updatedAt;
  }

  getDeletedAt(): Date | null {
    return this._deletedAt;
  }

  isDeleted(): boolean {
    return this._deletedAt !== null;
  }
}
