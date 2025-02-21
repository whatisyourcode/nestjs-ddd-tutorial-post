import { Controller, Get } from "@nestjs/common";

@Controller({ version: "1" })
export default class AppController {
  @Get("ping")
  ping(): string {
    return "pong";
  }
}
