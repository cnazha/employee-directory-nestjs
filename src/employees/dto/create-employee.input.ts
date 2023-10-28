import { Field, InputType } from '@nestjs/graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

@InputType()
export class CreateEmployeeInput {
  @Field(() => GraphQLEmailAddress, { description: 'Employee email address' })
  email: string;
}
