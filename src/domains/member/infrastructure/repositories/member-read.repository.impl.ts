import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import MemberDto from "@/domains/member/application/dtos/member.dto";
import MemberReadRepository from "@/domains/member/domain/repositories/member-read.repository";
import MemberOrmToDtoMapper from "@/domains/member/infrastructure/mappers/member-orm-to-dto.mapper";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberReadRepositoryImpl implements MemberReadRepository {
  constructor(
    @InjectRepository(MemberOrmEntity) private readonly repository: Repository<MemberOrmEntity>,
    private readonly memberOrmToDtoMapper: MemberOrmToDtoMapper,
  ) {}

  async getMemberById(memberId: number): Promise<MemberDto | null> {
    const result: MemberOrmEntity | null = await this.repository.findOne({ where: { id: memberId } });
    if (!result) {
      return null;
    }

    const dto: MemberDto = this.memberOrmToDtoMapper.ormToDto(result);

    return dto;
  }

  async getMemberByUlid(mebmerUlid: string): Promise<MemberDto | null> {
    const result: MemberOrmEntity | null = await this.repository.findOne({ where: { ulid: mebmerUlid } });
    if (!result) {
      return null;
    }

    const dto: MemberDto = this.memberOrmToDtoMapper.ormToDto(result);

    return dto;
  }
}
