import { CreateEmployeeInput } from './create-employee.input';
import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateEmployeeInput extends PartialType(
  OmitType(CreateEmployeeInput, ['salaryCurrency']),
) {
  @Field(() => GraphQLUUID, { description: 'Employee id' })
  id: string;
}
