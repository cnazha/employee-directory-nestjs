import { Field, InputType } from '@nestjs/graphql';
import { EmployeeStatus } from '../types/employee-status.enum';

@InputType({})
export class EmployeeFilterInput {
  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => EmployeeStatus, {
    nullable: true,
  })
  status: EmployeeStatus;

  @Field(() => String, {
    nullable: true,
    description: 'Employee department',
  })
  department?: string;
}
