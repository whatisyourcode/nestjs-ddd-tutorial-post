import { Column, Entity } from "typeorm";

import { MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from "@/domains/post/domain/constants/post.constraint";
import BaseOrmEntity from "@/shared/entities/base-orm.entity";

@Entity("post")
export default class PostOrmEntity extends BaseOrmEntity {
  @Column({ type: "varchar", length: MAX_TITLE_LENGTH })
  title: string;

  @Column({ type: "varchar", length: MAX_CONTENT_LENGTH })
  content: string;
}
