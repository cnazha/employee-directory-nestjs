import { CreateDepartmentInput } from './create-department.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => String)
  id: string;
}
