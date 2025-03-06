import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";

import AWSConfig, { AwsOptions } from "@/shared/configs/aws.config";

import IImageUploadRepository from "@/domains/image/domain/repositories/image-upload-repository.interface";
import ImageEntity from "@/domains/image/domain/entities/image.entity";
import ImageUploadFailedException from "@/domains/image/infrastructure/exceptions/image-upload-failed.exception";

@Injectable()
export default class ImageUploadRepository implements IImageUploadRepository {
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly cloudFrontUrl: string;

  constructor(private readonly awsConfig: AWSConfig) {
    const options: AwsOptions = this.awsConfig.createAwsOptions();
    const { region, accessKeyId, secretAccessKey, bucketName, cloudFrontUrl } = options;

    this.s3 = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
    this.bucketName = bucketName;
    this.cloudFrontUrl = cloudFrontUrl;
  }

  async upload(image: ImageEntity, dir: string): Promise<string> {
    const imageName: string = image.createImageName();
    const key: string = `${dir}/${imageName}`;
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: image.getBuffer(),
      ContentType: image.getContentType(),
    };

    try {
      await this.s3.send(new PutObjectCommand(params));

      return `${this.cloudFrontUrl}/${key}`;
    } catch (e) {
      throw new ImageUploadFailedException();
    }
  }
}
