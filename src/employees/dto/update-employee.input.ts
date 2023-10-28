import { CreateEmployeeInput } from './create-employee.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @Field(() => String)
  id: string;
}
