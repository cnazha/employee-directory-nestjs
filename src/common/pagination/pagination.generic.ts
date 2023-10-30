import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLNonNegativeInt, GraphQLPositiveInt } from 'graphql-scalars';
import { IPaginatedType } from './pagination.type';

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => [classRef], { nullable: true })
    items: T[];

    @Field((type) => GraphQLPositiveInt)
    page: number;

    @Field((type) => GraphQLNonNegativeInt)
    totalCount: number;

    @Field((type) => GraphQLNonNegativeInt)
    totalPages: number;

    @Field(() => Boolean, { nullable: true, defaultValue: false })
    hasNextPage: boolean;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
