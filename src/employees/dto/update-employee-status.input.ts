import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { EmployeeStatus } from '../types/employee-status.enum';

@InputType()
export class UpdateEmployeeStatusInput {
  @Field(() => GraphQLUUID, { description: 'Employee id' })
  id: string;

  @Field(() => EmployeeStatus, { description: 'Employee status' })
  status: EmployeeStatus;
}
