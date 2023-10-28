import { CreateEmployeeInput } from './create-employee.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @Field(() => GraphQLUUID, { description: 'Employee id' })
  id: string;
}
