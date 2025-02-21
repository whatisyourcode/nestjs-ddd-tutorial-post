import { Column, Index, BeforeInsert } from "typeorm";
import { ulid } from "ulidx";

import UlidAlreadyExistsException from "@/shared/exceptions/ulid-already-exists.exception";
import BaseOrmEntity from "@/shared/entities/base-orm.entity";

export default abstract class SignatureOrmEntity extends BaseOrmEntity {
  @Index()
  @Column({ type: "varchar", length: 26 })
  ulid: string;

  @BeforeInsert()
  generateUlid() {
    if (this.ulid) {
      throw new UlidAlreadyExistsException();
    }

    this.ulid = ulid();
  }
}
