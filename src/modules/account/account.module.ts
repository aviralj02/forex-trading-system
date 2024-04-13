import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from 'src/controllers/accounts/accounts.controller';
import { AccountSchema } from 'src/schemas/account.schema';
import { AccountsService } from 'src/services/accounts/accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [AccountController],
  providers: [AccountsService],
})
export class AccountModule {}
