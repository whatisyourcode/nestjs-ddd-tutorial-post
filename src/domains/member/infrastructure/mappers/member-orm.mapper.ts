import { Injectable } from "@nestjs/common";

import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";
import NameVo from "@/domains/member/domain/vos/name.vo";
import TelVo from "@/domains/member/domain/vos/tel.vo";
import IntroductionVo from "@/domains/member/domain/vos/introduction.vo";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberOrmMapper {
  entityToOrmEntity(entity: MemberEntity): MemberOrmEntity {
    const ormEntity: MemberOrmEntity = new MemberOrmEntity();
    ormEntity.id = entity.getId();
    ormEntity.ulid = entity.getUlid();
    ormEntity.name = entity.getNameVo().getName();
    ormEntity.tel = entity.getTelVo().getTel();
    ormEntity.introduction = entity.getIntroductionVo().getIntroduction();
    ormEntity.createdAt = entity.getCreatedAt();
    ormEntity.updatedAt = entity.getUpdatedAt();
    ormEntity.deletedAt = entity.getDeletedAt();

    return ormEntity;
  }

  createEntityToOrmEntity(entity: CreateMemberEntity): MemberOrmEntity {
    const ormEntity: MemberOrmEntity = new MemberOrmEntity();
    ormEntity.name = entity.getNameVo().getName();
    ormEntity.tel = entity.getTelVo().getTel();
    ormEntity.introduction = entity.getIntroductionVo().getIntroduction();
  
    return ormEntity;
  }

  toEntity(ormEntity: MemberOrmEntity): MemberEntity {
    return MemberEntity.create({
      id: ormEntity.id,
      ulid: ormEntity.ulid,
      name: NameVo.create({ name: ormEntity.name }),
      tel: TelVo.create({ tel: ormEntity.tel }),
      introduction: IntroductionVo.create({ introduction: ormEntity.introduction }),
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
      deletedAt: ormEntity.deletedAt,
    });
  }
}
