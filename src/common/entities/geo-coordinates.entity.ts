import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLLatitude, GraphQLLongitude } from 'graphql-scalars';

@ObjectType()
export class GeoCoordinatesEntity {
  @Field(() => GraphQLLatitude, { nullable: false })
  latitude: number;
  @Field(() => GraphQLLongitude, { nullable: false })
  longitude: number;
}
