import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import MemberController from "@/domains/member/presentation/controllers/member.controller";
import RegisterHandler from "@/domains/member/application/commands/handlers/register.handler";
import GetMemberHandler from "@/domains/member/application/queries/handlers/get-member.handler";
import { MEMBER_READ_REPOSITORY } from "@/domains/member/domain/repositories/member-read.repository";
import { MEMBER_WRITE_REPOSITORY } from "@/domains/member/domain/repositories/member-write.repository";
import MemberReadRepositoryImpl from "@/domains/member/infrastructure/repositories/member-read.repository.impl";
import MemberWriteRepositoryImpl from "@/domains/member/infrastructure/repositories/member-write.repository.impl";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";
import MemberDtoToDomainMapper from "@/domains/member/application/mappers/member-dto-to-domain.mapper";
import MemberDomainToOrmMapper from "@/domains/member/infrastructure/mappers/member-domain-to-orm.mapper";
import MemberOrmToDomainMapper from "@/domains/member/infrastructure/mappers/member-orm-to-domain.mapper";
import MemberOrmToDtoMapper from "@/domains/member/infrastructure/mappers/member-orm-to-dto.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([MemberOrmEntity])],
  controllers: [MemberController],
  providers: [
    RegisterHandler,
    GetMemberHandler,
    { provide: MEMBER_READ_REPOSITORY, useClass: MemberReadRepositoryImpl },
    { provide: MEMBER_WRITE_REPOSITORY, useClass: MemberWriteRepositoryImpl },
    MemberDtoToDomainMapper,
    MemberDomainToOrmMapper,
    MemberOrmToDomainMapper,
    MemberOrmToDtoMapper,
  ],
})
export default class MemberModule {}
