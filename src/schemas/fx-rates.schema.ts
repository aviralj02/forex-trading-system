import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FxRateDocument = HydratedDocument<FxRate>;

@Schema()
export class FxRate {
  @Prop()
  quoteId: number;

  @Prop(Array)
  exchangeRate: [];
}

export const FxRateSchema = SchemaFactory.createForClass(FxRate);
