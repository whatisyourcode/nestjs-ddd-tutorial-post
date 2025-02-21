import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import MemberController from "@/domains/member/presentation/controllers/member.controller";
import { REGISTER_USECASE } from "@/domains/member/application/usecases/register.usecase";
import RegisterUsecaseImpl from "@/domains/member/application/usecases/impl/register.usecase.impl";
import MemberMapper from "@/domains/member/application/mappers/member.mapper";
import { MEMBER_SERVICE } from "@/domains/member/domain/services/member.service";
import MemberServiceImpl from "@/domains/member/domain/services/impl/member.service.impl";
import { MEMBER_REPOSITORY } from "@/domains/member/domain/repositories/member.repository";
import MemberRepositoryImpl from "@/domains/member/infrastructure/repositories/member.repository.impl";
import MemberOrmMapper from "@/domains/member/infrastructure/mappers/member-orm.mapper";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MemberOrmEntity])],
  controllers: [MemberController],
  providers: [
    MemberMapper,
    { provide: REGISTER_USECASE, useClass: RegisterUsecaseImpl },
    { provide: MEMBER_SERVICE, useClass: MemberServiceImpl },
    { provide: MEMBER_REPOSITORY, useClass: MemberRepositoryImpl },
    MemberOrmMapper,
  ],
})
export default class MemberModule {}
