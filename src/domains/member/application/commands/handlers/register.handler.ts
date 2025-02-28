import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import RegisterCommand from "@/domains/member/application/commands/register.command";
import MemberDtoToDomainMapper from "@/domains/member/application/mappers/member-dto-to-domain.mapper";
import MemberDomainToDtoMapper from "@/domains/member/application/mappers/member-domain-to-dto.mapper";
import RegisterResDto from "@/domains/member/application/dtos/response/register-res.dto";
import MemberDto from "@/domains/member/application/dtos/member.dto";
import MemberWriteRepository, {
  MEMBER_WRITE_REPOSITORY,
} from "@/domains/member/domain/repositories/member-write.repository";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";
import MemberEntity from "@/domains/member/domain/entities/member.entity";

@CommandHandler(RegisterCommand)
export default class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(MEMBER_WRITE_REPOSITORY) private readonly memberWriteRepository: MemberWriteRepository,
    private readonly memberDtoToDomainMapper: MemberDtoToDomainMapper,
    private readonly memberDomainToDtoMapper: MemberDomainToDtoMapper,
  ) {}

  @Transactional()
  async execute(command: RegisterCommand): Promise<RegisterResDto> {
    const { registerReqDto } = command;
    const { member } = registerReqDto;
    const entity: CreateMemberEntity = this.memberDtoToDomainMapper.createDtoToCreateDomain(member);

    const createdEntity: MemberEntity = await this.memberWriteRepository.create(entity);
    const memberDto: MemberDto = this.memberDomainToDtoMapper.domainToDto(createdEntity);

    return new RegisterResDto(memberDto);
  }
}
