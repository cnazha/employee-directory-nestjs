import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
  @Field(() => ID, { description: 'Employee Id' })
  id: string;
}
