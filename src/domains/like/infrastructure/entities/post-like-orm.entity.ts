import { Entity, Unique, Column } from "typeorm";

import LikeOrmEntity from "@/domains/like/infrastructure/entities/like-orm.entity";

@Entity("post_like")
@Unique(["postId", "likerId"])
export default class PostLikeOrmEntity extends LikeOrmEntity {
  @Column({ type: "int" })
  postId: number;
}
