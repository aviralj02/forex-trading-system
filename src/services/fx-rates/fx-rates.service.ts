import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FxLiveDocument } from 'src/schemas/fx-rates-live.schema';
import { FxRateDocument } from 'src/schemas/fx-rates.schema';

@Injectable()
export class FxRatesService {
  constructor(
    @InjectModel('FxRate') private FxRateModel: Model<FxRateDocument>,
    @InjectModel('FxLive') private FxLiveModel: Model<FxLiveDocument>,
  ) {}

  async generateQuoteId(): Promise<number> {
    try {
      const currentConversionRate = await this.FxLiveModel.find().exec();
      const quoteId = Math.floor(Math.random() * 100000);

      const fxRate = {
        quoteId,
        exchangeRate: currentConversionRate,
      };
      await this.FxRateModel.create(fxRate);

      return quoteId;
    } catch (error) {
      console.log('Error generating quote Id: ' + error);
    }
  }
}
