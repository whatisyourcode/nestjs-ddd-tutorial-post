import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface AwsOptions {
  readonly region: string;
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly bucketName: string;
  readonly cloudFrontUrl: string;
}

@Injectable()
export default class AWSConfig {
  constructor(private readonly configService: ConfigService) {}

  createAwsOptions(): AwsOptions {
    return {
      region: this.configService.get<string>("AWS_REGION"),
      accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY"),
      bucketName: this.configService.get<string>("AWS_BUCKETNAME"),
      cloudFrontUrl: this.configService.get<string>("AWS_CLOUDFRONT_URL"),
    };
  }
}
