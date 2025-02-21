import { Inject, Injectable } from "@nestjs/common";

import RegisterUsecase from "@/domains/member/application/usecases/register.usecase";
import MemberMapper from "@/domains/member/application/mappers/member.mapper";
import RegisterReqDto from "@/domains/member/application/dtos/request/register-req.dto";
import RegisterResDto from "@/domains/member/application/dtos/response/register-res.dto";
import MemberDto from "@/domains/member/application/dtos/member.dto";
import MemberService, { MEMBER_SERVICE } from "@/domains/member/domain/services/member.service";
import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";

@Injectable()
export default class RegisterUsecaseImpl implements RegisterUsecase {
  constructor(
    @Inject(MEMBER_SERVICE) private readonly memberService: MemberService,
    private readonly memberMapper: MemberMapper,
  ) {}

  async execute(reqDto: RegisterReqDto): Promise<RegisterResDto> {
    const { member } = reqDto;
    const entity: CreateMemberEntity = this.memberMapper.createDtoToCreateEntity(member);
    const result: MemberEntity = await this.memberService.createMember(entity);

    const memberDto: MemberDto = this.memberMapper.entityToDto(result);
    const resDto: RegisterResDto = new RegisterResDto(memberDto);

    return resDto;
  }
}
