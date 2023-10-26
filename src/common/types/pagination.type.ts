import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
  items: T[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => [classRef], { nullable: true })
    items: T[];

    @Field((type) => Int)
    page: number;

    @Field((type) => Int)
    totalCount: number;

    @Field(() => Boolean, { nullable: true, defaultValue: null })
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
