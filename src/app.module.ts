import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account/account.module';
import { ConfigModule } from '@nestjs/config';
import { FxRatesLiveModule } from './modules/fx-rates-live/fx-rates-live.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AccountModule,
    FxRatesLiveModule,
  ],
  providers: [],
})
export class AppModule {}
