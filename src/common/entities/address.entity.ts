import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDocumentEntity } from './base.document';
import { GraphQLCountryCode, GraphQLPostalCode } from 'graphql-scalars';
import { Prop, Schema } from '@nestjs/mongoose';
import { GeoCoordinatesEntity } from './geo-coordinates.entity';

@Schema({
  _id: false,
})
@ObjectType()
export class AddressEntity extends BaseDocumentEntity {
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false })
  building: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false })
  street: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false })
  city: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false })
  state: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => GraphQLCountryCode, { nullable: false })
  country: string;
  @Prop({
    type: String,
    required: false,
  })
  @Field(() => GraphQLPostalCode, { nullable: true })
  postalCode: string;
  @Prop({
    type: String,
    required: false,
  })
  @Field(() => String, { nullable: false })
  notes: string;
  @Field(() => GeoCoordinatesEntity, { nullable: true })
  coordinates: GeoCoordinatesEntity;
}
