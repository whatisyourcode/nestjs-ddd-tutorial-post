import { Column, Entity } from "typeorm";

import BaseOrmEntity from "@/shared/entities/base-orm.entity";

import { MAX_TITLE_LENGTH } from "@/domains/post/domain/constants/post.constraint";

@Entity("post")
export default class PostOrmEntity extends BaseOrmEntity {
  @Column({ type: "varchar", length: MAX_TITLE_LENGTH })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "int" })
  authorId: number;
}
