import { Injectable } from "@nestjs/common";

import MemberEntity from "@/domains/member/domain/entities/member.entity";
import MemberCreateEntity from "@/domains/member/domain/entities/member-create.entity";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberDomainToOrmMapper {
  domainToOrm(entity: MemberEntity): MemberOrmEntity {
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

  createDomainToOrm(entity: MemberCreateEntity): MemberOrmEntity {
    const ormEntity: MemberOrmEntity = new MemberOrmEntity();
    ormEntity.name = entity.getNameVo().getName();
    ormEntity.tel = entity.getTelVo().getTel();
    ormEntity.introduction = entity.getIntroductionVo().getIntroduction();

    return ormEntity;
  }
}
