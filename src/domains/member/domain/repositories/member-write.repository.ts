import MemberEntity from "@/domains/member/domain/entities/member.entity";
import MemberCreateEntity from "@/domains/member/domain/entities/member-create.entity";

export const MEMBER_WRITE_REPOSITORY = Symbol("member write repository");

export default interface MemberWriteRepository {
  create(entity: MemberCreateEntity): Promise<MemberEntity>;
  save(entity: MemberEntity): Promise<MemberEntity>;
  softRemove(entity: MemberEntity): Promise<void>;
  remove(entity: MemberEntity): Promise<void>;
}
