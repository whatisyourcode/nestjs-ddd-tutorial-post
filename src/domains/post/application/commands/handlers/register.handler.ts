import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Transactional } from "typeorm-transactional";

import RegisterCommand from "@/domains/member/application/commands/register.command";
import MemberDtoToDomainMapper from "@/domains/member/application/mappers/member-dto-to-domain.mapper";
import MemberWriteRepository, {
  MEMBER_WRITE_REPOSITORY,
} from "@/domains/member/domain/repositories/member-write.repository";
import MemberCreateEntity from "@/domains/member/domain/entities/member-create.entity";

@CommandHandler(RegisterCommand)
export default class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(MEMBER_WRITE_REPOSITORY) private readonly memberWriteRepository: MemberWriteRepository,
    private readonly memberDtoToDomainMapper: MemberDtoToDomainMapper,
  ) {}

  @Transactional()
  async execute(command: RegisterCommand): Promise<void> {
    const { registerReqDto } = command;
    const { member } = registerReqDto;
    const entity: MemberCreateEntity = this.memberDtoToDomainMapper.createDtoToCreateDomain(member);

    await this.memberWriteRepository.create(entity);
  }
}
