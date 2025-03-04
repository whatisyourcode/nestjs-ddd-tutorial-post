import { Column, Entity } from "typeorm";

import BaseOrmEntity from "@/shared/entities/base-orm.entity";
import { MAX_CONTENT_LENGTH } from "../../domain/constants/comment.constraint";

@Entity("comment")
export default class CommentOrmEntity extends BaseOrmEntity {
  @Column({ type: "varchar", length: MAX_CONTENT_LENGTH })
  content: string;

  @Column({ type: "int" })
  postId: number;
}
