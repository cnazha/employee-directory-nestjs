import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLLatitude, GraphQLLongitude } from 'graphql-scalars';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class GeoCoordinatesEntity {
  @Field(() => GraphQLLatitude, { nullable: false })
  latitude: number;
  @Field(() => GraphQLLongitude, { nullable: false })
  longitude: number;
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  point: {
    type: string;
    coordinates: number[];
  };
}
