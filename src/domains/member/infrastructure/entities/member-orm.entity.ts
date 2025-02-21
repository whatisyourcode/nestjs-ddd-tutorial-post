import { Column, Entity } from "typeorm";

import SignatureOrmEntity from "@/shared/entities/signature-orm.entity";

import {
  MAX_NAME_LENGTH,
  TEL_LENGTH,
  MAX_INTRODUCTION_LENGTH,
} from "@/domains/member/domain/constants/member.constant";

@Entity("member")
export default class MemberOrmEntity extends SignatureOrmEntity {
  @Column({ type: "varchar", length: MAX_NAME_LENGTH })
  name: string;

  @Column({ type: "varchar", length: TEL_LENGTH })
  tel: string;

  @Column({ type: "varchar", length: MAX_INTRODUCTION_LENGTH })
  introduction: string;
}
