import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FxLiveDocument } from 'src/schemas/fx-rates-live.schema';

@Injectable()
export class FxRatesLiveService {
  constructor(
    @InjectModel('FxLive') private FxLiveModel: Model<FxLiveDocument>,
  ) {
    this.fetchAndStoreFxRates();
    setInterval(() => this.fetchAndStoreFxRates(), 30000);
  }

  async fetchAndStoreFxRates(): Promise<void> {
    try {
      // USD to JPY
      const res1 = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
      );

      const USD_JPY_data = await res1.json();
      const exchangeRate1 =
        USD_JPY_data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      await this.storeFxRate('USD/JPY', parseFloat(exchangeRate1));

      // USD to EUR
      const res2 = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
      );

      const USD_EUR_data = await res2.json();
      const exchangeRate2 =
        USD_EUR_data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      await this.storeFxRate('USD/EUR', parseFloat(exchangeRate2));

      //USD to INR
      const res3 = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=${process.env.ALPHAVANTAGE_API_KEY}`,
      );

      const USD_INR_data = await res3.json();
      const exchangeRate3 =
        USD_INR_data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      await this.storeFxRate('USD/INR', parseFloat(exchangeRate3));
    } catch (error) {
      console.log('Error fetching data. Error: ' + error);
    }
  }

  async storeFxRate(currencyPair: string, rate: number): Promise<void> {
    try {
      await this.FxLiveModel.findOneAndUpdate(
        { currencyPair },
        { rate },
        { upsert: true },
      );
    } catch (error) {
      console.error('Error storing FX rate:', error);
    }
  }
}
