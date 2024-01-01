import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the "src/public" directory
  app.useStaticAssets(join(process.cwd(), 'src', 'public'));

  await app.listen(3001);
}
bootstrap();