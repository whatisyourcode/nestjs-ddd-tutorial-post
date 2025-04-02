import { Column } from "typeorm";

import BaseOrmEntity from "@/shared/entities/base-orm.entity";

export default abstract class LikeOrmEntity extends BaseOrmEntity {
  @Column({ type: "int" })
  likerId: number;
}
