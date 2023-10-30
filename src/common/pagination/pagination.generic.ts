import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLNonNegativeInt, GraphQLPositiveInt } from 'graphql-scalars';
import { IPaginatedType } from './pagination.type';

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    items: T[];

    @Field(() => GraphQLPositiveInt)
    page: number;

    @Field(() => GraphQLNonNegativeInt)
    totalCount: number;

    @Field(() => GraphQLNonNegativeInt)
    totalPages: number;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    hasNextPage: boolean;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
