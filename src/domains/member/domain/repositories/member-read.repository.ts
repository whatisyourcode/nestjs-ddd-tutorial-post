import MemberDto from "@/domains/member/application/dtos/member.dto";

export const MEMBER_READ_REPOSITORY = Symbol("member read repository");

export default interface MemberReadRepository {
  getMemberById(memberId: number): Promise<MemberDto | null>;
  getMemberByUlid(mebmerUlid: string): Promise<MemberDto | null>;
}
