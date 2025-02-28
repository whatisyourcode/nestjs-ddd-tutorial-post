import { Injectable } from "@nestjs/common";

import MemberDto from "@/domains/member/application/dtos/member.dto";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberOrmToDtoMapper {
  ormToDto(ormEntity: MemberOrmEntity): MemberDto {
    const { ulid, name, tel, introduction, createdAt, deletedAt } = ormEntity;
    const isDeleted: boolean = !!deletedAt;

    return new MemberDto(ulid, name, tel, introduction, createdAt, isDeleted);
  }
}
