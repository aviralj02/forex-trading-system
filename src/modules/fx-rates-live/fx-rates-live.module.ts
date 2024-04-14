import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FxLiveSchema } from 'src/schemas/fx-rates-live.schema';
import { FxRatesLiveService } from 'src/services/fx-rates-live/fx-rates-live.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FxLive', schema: FxLiveSchema }]),
  ],
  controllers: [],
  providers: [FxRatesLiveService],
})
export class FxRatesLiveModule {}
