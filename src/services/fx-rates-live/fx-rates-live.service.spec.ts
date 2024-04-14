import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesLiveService } from './fx-rates-live.service';

describe('FxRatesLiveService', () => {
  let service: FxRatesLiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxRatesLiveService],
    }).compile();

    service = module.get<FxRatesLiveService>(FxRatesLiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
