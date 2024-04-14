import { Body, Controller, Post } from '@nestjs/common';
import { ConversionData } from 'src/dtos/ConversionData.dto';
import { FxRatesService } from 'src/services/fx-rates/fx-rates.service';

@Controller('fx-conversion')
export class FxConversionController {
  constructor(private readonly fxRateService: FxRatesService) {}

  @Post()
  async fxCurrencyConversion(@Body() conversionData: ConversionData) {
    const { quoteId, fromCurrency, toCurrency, amount } = conversionData;
    const convertedAmount = await this.fxRateService.performCurrencyConversion(
      quoteId,
      fromCurrency,
      toCurrency,
      amount,
    );

    if (!convertedAmount)
      return {
        error: 'quoteId not found or this conversion might not be supported.',
      };

    return { convertedAmount: convertedAmount, currency: toCurrency };
  }
}
