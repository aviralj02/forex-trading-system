import { Body, Controller, Get, Post } from '@nestjs/common';
import { TopUpDto } from 'src/dtos/topUp.dto';
import { AccountsService } from 'src/services/accounts/accounts.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountsService) {}

  @Post('topup')
  async topUpAccount(@Body() topUp: TopUpDto) {
    const { currency, amount } = topUp;
    const topUpState = await this.accountService.topUpAccount(currency, amount);
    if (topUpState) {
      return 'Top Up Successful';
    } else return 'Top Up Unsuccessfull';
  }

  @Get('balance')
  async getBalance() {
    const balance = await this.accountService.fetchBalance();
    return balance;
  }
}
