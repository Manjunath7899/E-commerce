import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  area: string;

  @Prop()
  landmark: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
