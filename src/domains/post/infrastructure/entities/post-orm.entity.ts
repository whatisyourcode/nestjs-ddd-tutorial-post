import { Column, Entity } from "typeorm";

import { MAX_TITLE_LENGTH } from "@/domains/post/domain/constants/post.constraint";
import BaseOrmEntity from "@/shared/entities/base-orm.entity";

@Entity("post")
export default class PostOrmEntity extends BaseOrmEntity {
  @Column({ type: "varchar", length: MAX_TITLE_LENGTH })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "int" })
  authorId: number;
}
