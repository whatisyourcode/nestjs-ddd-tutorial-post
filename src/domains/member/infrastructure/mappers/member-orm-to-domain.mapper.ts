import { Injectable } from "@nestjs/common";

import MemberEntity from "@/domains/member/domain/entities/member.entity";
import NameVo from "@/domains/member/domain/vos/name.vo";
import TelVo from "@/domains/member/domain/vos/tel.vo";
import IntroductionVo from "@/domains/member/domain/vos/introduction.vo";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberOrmToDomainMapper {
  ormToDomain(ormEntity: MemberOrmEntity): MemberEntity {
    const { id, ulid, name, tel, introduction, createdAt, updatedAt, deletedAt } = ormEntity;

    return MemberEntity.create({
      id,
      ulid,
      name: NameVo.create({ name }),
      tel: TelVo.create({ tel: tel }),
      introduction: IntroductionVo.create({ introduction: introduction }),
      createdAt,
      updatedAt,
      deletedAt,
    });
  }
}
