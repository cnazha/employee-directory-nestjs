import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-scalars';

@InterfaceType()
export abstract class BaseDocumentInterface {
  @Field(() => ID, { nullable: false })
  id: string;
  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date;
  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date;
}
