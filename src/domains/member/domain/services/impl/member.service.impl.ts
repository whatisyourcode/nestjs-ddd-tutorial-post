import { Inject, Injectable } from "@nestjs/common";

import MemberService from "@/domains/member/domain/services/member.service";
import MemberRepository, { MEMBER_REPOSITORY } from "@/domains/member/domain/repositories/member.repository";
import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";

@Injectable()
export default class MemberServiceImpl implements MemberService {
  constructor(@Inject(MEMBER_REPOSITORY) private readonly memberRepository: MemberRepository) {}

  async createMember(entity: CreateMemberEntity): Promise<MemberEntity> {
    const result: MemberEntity = await this.memberRepository.create(entity);

    return result;
  }
}
