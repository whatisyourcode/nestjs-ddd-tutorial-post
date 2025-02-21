import { DocumentBuilder } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
  .setTitle("Community Tutorial Api Document")
  .setVersion("1.0.0")
  .addServer("http://localhost:3000/", "Local environment")
  .build();

export default swaggerConfig;
