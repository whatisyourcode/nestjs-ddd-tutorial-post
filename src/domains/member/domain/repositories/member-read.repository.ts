import MemberDto from "@/domains/member/application/dtos/member.dto";

export const MEMBER_READ_REPOSITORY = Symbol("member read repository");

export default interface MemberReadRepository {
  getMemberById(id: number): Promise<MemberDto | null>;
  getMemberByUlid(ulid: string): Promise<MemberDto | null>;
}
