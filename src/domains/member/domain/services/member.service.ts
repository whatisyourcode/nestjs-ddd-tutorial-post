import MemberEntity from "@/domains/member/domain/entities/member.entity";
import CreateMemberEntity from "@/domains/member/domain/entities/create-member.entity";

export const MEMBER_SERVICE = Symbol("member service");

export default interface MemberService {
  createMember(entity: CreateMemberEntity): Promise<MemberEntity>;
}
