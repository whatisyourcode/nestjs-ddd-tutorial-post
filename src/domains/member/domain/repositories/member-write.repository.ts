import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";

export const MEMBER_WRITE_REPOSITORY = Symbol("member write repository");

export default interface MemberWriteRepository {
  create(entity: CreateMemberEntity): Promise<MemberEntity>;
  save(entity: MemberEntity): Promise<MemberEntity>;
  softRemove(entity: MemberEntity): Promise<void>;
  remove(entity: MemberEntity): Promise<void>;
}
