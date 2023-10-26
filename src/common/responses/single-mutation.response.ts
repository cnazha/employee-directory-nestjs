import { MutationResponse } from './mutation.response';
import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function SingleMutationResponse<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true, implements: () => [MutationResponse] })
  abstract class SingleMutationType implements MutationResponse {
    @Field(() => classRef, { nullable: true })
    item?: T;
    @Field(() => Boolean, { nullable: false })
    success: boolean;
    @Field(() => String, { nullable: true })
    message: string;
  }
  return SingleMutationType;
}
