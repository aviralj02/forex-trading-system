import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDocument } from 'src/schemas/account.schema';
import { FxLiveDocument } from 'src/schemas/fx-rates-live.schema';
import { FxRateDocument } from 'src/schemas/fx-rates.schema';

type ExchangeRate = {
  currencyPair: string;
  rate: number;
};

@Injectable()
export class FxRatesService {
  constructor(
    @InjectModel('FxRate') private FxRateModel: Model<FxRateDocument>,
    @InjectModel('FxLive') private FxLiveModel: Model<FxLiveDocument>,
    @InjectModel('Account') private accountModel: Model<AccountDocument>,
  ) {}

  async generateQuoteId(): Promise<number> {
    try {
      // getting live rate from memory
      const currentConversionRate = await this.FxLiveModel.find().exec();
      const quoteId = Math.floor(Math.random() * 100000);

      // assigning quoteId to it
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

  async performCurrencyConversion(
    quoteId: string,
    fromCurrency: string,
    toCurrency: string,
    amount: number,
  ) {
    try {
      const fetchedFxRate = await this.FxRateModel.findOne({
        quoteId: quoteId,
      });

      if (!fetchedFxRate) {
        return null;
      }

      const pair = `${fromCurrency}/${toCurrency}`;
      const exchangeRateObject: ExchangeRate = fetchedFxRate.exchangeRate.find(
        (item: ExchangeRate) => item.currencyPair === pair,
      );

      if (!exchangeRateObject) return null;

      const convertedAmount = exchangeRateObject.rate * amount;

      await this.accountModel.findOneAndUpdate(
        { currency: toCurrency },
        { $inc: { amount: convertedAmount } },
        { upsert: true, new: true },
      );

      await this.accountModel.findOneAndUpdate(
        { currency: fromCurrency },
        { $inc: { amount: -amount } },
        { upsert: true, new: true },
      );
      return convertedAmount;
    } catch (error) {
      console.log('Error performing conversion. Error: ' + error);
    }
  }
}
