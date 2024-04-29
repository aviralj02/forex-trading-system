import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FxConversionController } from 'src/controllers/fx-conversion/fx-conversion.controller';
import { FxRatesController } from 'src/controllers/fx-rates/fx-rates.controller';
import { AccountSchema } from 'src/schemas/account.schema';
import { FxLiveSchema } from 'src/schemas/fx-rates-live.schema';
import { FxRateSchema } from 'src/schemas/fx-rates.schema';
import { FxRatesLiveService } from 'src/services/fx-rates-live/fx-rates-live.service';
import { FxRatesService } from 'src/services/fx-rates/fx-rates.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FxLive', schema: FxLiveSchema }]),
    MongooseModule.forFeature([{ name: 'FxRate', schema: FxRateSchema }]),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [FxRatesController, FxConversionController],
  providers: [FxRatesLiveService, FxRatesService],
})
export class FxRatesLiveModule {}
