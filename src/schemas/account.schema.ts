import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop()
  currency: string;

  @Prop()
  amount: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
