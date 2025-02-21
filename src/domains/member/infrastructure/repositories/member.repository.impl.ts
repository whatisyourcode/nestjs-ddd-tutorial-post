import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import MemberRepository from "@/domains/member/domain/repositories/member.repository";
import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";
import MemberOrmMapper from "@/domains/member/infrastructure/mappers/member-orm.mapper";
import MemberOrmEntity from "@/domains/member/infrastructure/entities/member-orm.entity";

@Injectable()
export default class MemberRepositoryImpl implements MemberRepository {
  constructor(
    @InjectRepository(MemberOrmEntity) private readonly repository: Repository<MemberOrmEntity>,
    private readonly memberOrmMapper: MemberOrmMapper,
  ) {}

  async findById(id: number): Promise<MemberEntity | null> {
    const result: MemberOrmEntity | null = await this.repository.findOne({ where: { id } });
    if (!result) {
      return null;
    }

    const entity: MemberEntity = this.memberOrmMapper.toEntity(result);

    return entity;
  }

  async findByUlid(ulid: string): Promise<MemberEntity | null> {
    const result: MemberOrmEntity | null = await this.repository.findOne({ where: { ulid } });
    if (!result) {
      return null;
    }

    const entity: MemberEntity = this.memberOrmMapper.toEntity(result);

    return entity;
  }

  async create(entity: CreateMemberEntity): Promise<MemberEntity> {
    const ormEntity: MemberOrmEntity = this.memberOrmMapper.createEntityToOrmEntity(entity);
    const result: MemberOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: MemberEntity = this.memberOrmMapper.toEntity(result);

    return savedEntity;
  }

  async save(entity: MemberEntity): Promise<MemberEntity> {
    const ormEntity: MemberOrmEntity = this.memberOrmMapper.entityToOrmEntity(entity);
    const result: MemberOrmEntity = await this.repository.save(ormEntity);
    const savedEntity: MemberEntity = this.memberOrmMapper.toEntity(result);

    return savedEntity;
  }

  async softRemove(entity: MemberEntity): Promise<void> {
    const ormEntity: MemberOrmEntity = this.memberOrmMapper.entityToOrmEntity(entity);

    await this.repository.softRemove(ormEntity);
  }

  async remove(entity: MemberEntity): Promise<void> {
    const ormEntity: MemberOrmEntity = this.memberOrmMapper.entityToOrmEntity(entity);

    await this.repository.remove(ormEntity);
  }
}
