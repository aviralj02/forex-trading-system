import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopUpDto } from 'src/dtos/topUp.dto';
import { AccountDocument } from 'src/schemas/account.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Account') private accountModel: Model<AccountDocument>,
  ) {}

  async topUpAccount(currency: string, amount: number): Promise<TopUpDto> {
    const updateTopUp = await this.accountModel
      .findOneAndUpdate(
        { currency },
        { $inc: { amount } },
        { upsert: true, new: true },
      )
      .exec();
    return updateTopUp;
  }
}
