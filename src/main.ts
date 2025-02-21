import { NestFactory } from "@nestjs/core";
import { VersioningType, ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

import AppModule from "@/app.module";
import swaggerConfig from "@/shared/configs/swagger.config";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*", allowedHeaders: "*" });
  app.setGlobalPrefix("api");
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  SwaggerModule.setup("api-docs", app, () => SwaggerModule.createDocument(app, swaggerConfig));

  await app.listen(3000);
}
bootstrap();
