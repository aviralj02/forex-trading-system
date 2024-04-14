import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FxRatesController } from 'src/controllers/fx-rates/fx-rates.controller';
import { FxLiveSchema } from 'src/schemas/fx-rates-live.schema';
import { FxRateSchema } from 'src/schemas/fx-rates.schema';
import { FxRatesLiveService } from 'src/services/fx-rates-live/fx-rates-live.service';
import { FxRatesService } from 'src/services/fx-rates/fx-rates.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FxLive', schema: FxLiveSchema }]),
    MongooseModule.forFeature([{ name: 'FxRate', schema: FxRateSchema }]),
  ],
  controllers: [FxRatesController],
  providers: [FxRatesLiveService, FxRatesService],
})
export class FxRatesLiveModule {}
