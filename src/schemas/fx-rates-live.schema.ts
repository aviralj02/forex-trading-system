import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FxLiveDocument = HydratedDocument<FxLive>;

@Schema()
export class FxLive {
  @Prop()
  currencyPair: string;

  @Prop()
  rate: number;
}

export const FxLiveSchema = SchemaFactory.createForClass(FxLive);
