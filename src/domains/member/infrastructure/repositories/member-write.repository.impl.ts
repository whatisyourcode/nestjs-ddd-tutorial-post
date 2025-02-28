import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import MemberWriteRepository from "@/domains/member/domain/repositories/member-write.repository";
import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";
import MemberDomainToOrmMapper from "@/domains/member/infrastructure/mappers/member-domain-to-orm.mapper";
import MemberOrmToDomainMapper from "@/domains/member/infrastructure/mappers/member-orm-to-domain.mapper";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberWriteRepositoryImpl implements MemberWriteRepository {
  constructor(
    @InjectRepository(MemberOrmEntity) private readonly repository: Repository<MemberOrmEntity>,
    private readonly memberDomainToOrmMapper: MemberDomainToOrmMapper,
    private readonly memberOrmToDomainMapper: MemberOrmToDomainMapper,
  ) {}

  async create(entity: CreateMemberEntity): Promise<MemberEntity> {
    const ormEntity: MemberOrmEntity = this.memberDomainToOrmMapper.createDomainToOrm(entity);
    const result: MemberOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: MemberEntity = this.memberOrmToDomainMapper.ormToDomain(result);

    return savedEntity;
  }

  async save(entity: MemberEntity): Promise<MemberEntity> {
    const ormEntity: MemberOrmEntity = this.memberDomainToOrmMapper.domainToOrm(entity);
    const result: MemberOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: MemberEntity = this.memberOrmToDomainMapper.ormToDomain(result);

    return savedEntity;
  }

  async softRemove(entity: MemberEntity): Promise<void> {
    const ormEntity: MemberOrmEntity = this.memberDomainToOrmMapper.domainToOrm(entity);

    await this.repository.softRemove(ormEntity);
  }

  async remove(entity: MemberEntity): Promise<void> {
    const ormEntity: MemberOrmEntity = this.memberDomainToOrmMapper.domainToOrm(entity);

    await this.repository.remove(ormEntity);
  }
}
