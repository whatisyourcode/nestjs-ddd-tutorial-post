import ImageEntity from "@/domains/image/domain/entities/image.entity";

export const IMAGE_UPLOAD_REPOSITORY = Symbol("image upload repository");

export default interface IImageUploadRepository {
  upload(image: ImageEntity, dir: string): Promise<string>;
}
