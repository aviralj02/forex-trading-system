import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Forex Trading System')
    .setDescription(
      'The system offers a range of APIs enabling users to perform essential functions such as topping up their accounts, accessing live FX conversion rates, executing currency conversions, and reviewing account balances. Made by Aviral Jain',
    )
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
