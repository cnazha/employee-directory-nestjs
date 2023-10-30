import { Field, InputType } from '@nestjs/graphql';
import { GraphQLPositiveInt } from 'graphql-scalars';

export type PaginationArgs = {
  page: number;
  limit: number;
};

@InputType()
export class PaginationInput {
  @Field(() => GraphQLPositiveInt, {
    nullable: true,
    defaultValue: 1,
  })
  page: number;

  @Field(() => GraphQLPositiveInt, {
    nullable: true,
    defaultValue: 10,
  })
  limit: number;
}
