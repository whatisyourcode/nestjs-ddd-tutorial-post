import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import MemberNotFoundException from "@/domains/member/application/exceptions/member-not-found-exception";
import GetMemberQuery from "@/domains/member/application/queries/get-member.query";
import MemberResDto from "@/domains/member/application/dtos/response/member-res.dto";
import MemberDto from "@/domains/member/application/dtos/member.dto";
import MemberReadRepository, {
  MEMBER_READ_REPOSITORY,
} from "@/domains/member/domain/repositories/member-read.repository";

@QueryHandler(GetMemberQuery)
export default class GetMemberHandler implements IQueryHandler<GetMemberQuery> {
  constructor(@Inject(MEMBER_READ_REPOSITORY) private readonly memberReadRepository: MemberReadRepository) {}

  @Transactional()
  async execute(query: GetMemberQuery): Promise<MemberResDto> {
    const { memberId } = query;
    const memberDto: MemberDto = await this.memberReadRepository.getMemberById(memberId);
    if (!memberDto) {
      throw new MemberNotFoundException();
    }

    return new MemberResDto(memberDto);
  }
}
