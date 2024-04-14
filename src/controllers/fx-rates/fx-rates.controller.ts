import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from 'src/services/fx-rates/fx-rates.service';

@Controller('fx-rates')
export class FxRatesController {
  constructor(private readonly fxService: FxRatesService) {}

  @Get()
  async fetchRateFromMemory() {
    const quoteId = await this.fxService.generateQuoteId();
    return { quoteId: quoteId.toString(), expiry_at: quoteId.toString() };
  }
}
