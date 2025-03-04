import { Injectable } from "@nestjs/common";

import CreateMemberDto from "@/domains/member/application/dtos/create-member.dto";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";
import NameVo from "@/domains/member/domain/vos/name.vo";
import TelVo from "@/domains/member/domain/vos/tel.vo";
import IntroductionVo from "@/domains/member/domain/vos/introduction.vo";

@Injectable()
export default class MemberDtoToDomainMapper {
  createDtoToCreateDomain(dto: CreateMemberDto): CreateMemberEntity {
    const { name, tel, introduction } = dto;
    const entity: CreateMemberEntity = CreateMemberEntity.create({
      name: NameVo.create({ name }),
      tel: TelVo.create({ tel }),
      introduction: IntroductionVo.create({ introduction }),
    });

    return entity;
  }
}
