import RegisterReqDto from "@/domains/member/application/dtos/request/register-req.dto";

export default class RegisterCommand {
  readonly registerReqDto: RegisterReqDto;

  constructor(registerReqDto: RegisterReqDto) {
    this.registerReqDto = registerReqDto;
  }
}
