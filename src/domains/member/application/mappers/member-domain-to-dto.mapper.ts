import { Injectable } from "@nestjs/common";

import MemberDto from "@/domains/member/application/dtos/member.dto";
import MemberEntity from "@/domains/member/domain/entities/member.entity";

@Injectable()
export default class MemberDomainToDtoMapper {
  domainToDto(entity: MemberEntity): MemberDto {
    return new MemberDto(
      entity.getUlid(),
      entity.getNameVo().getName(),
      entity.getTelVo().getTel(),
      entity.getIntroductionVo().getIntroduction(),
      entity.getCreatedAt(),
      entity.isDeleted(),
    );
  }
}
