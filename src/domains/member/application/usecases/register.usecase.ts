import RegisterReqDto from "@/domains/member/application/dtos/request/register-req.dto";
import RegisterResDto from "@/domains/member/application/dtos/response/register-res.dto";

export const REGISTER_USECASE = Symbol("create member usecase");

export default interface RegisterUsecase {
  execute(reqDto: RegisterReqDto): Promise<RegisterResDto>;
}
