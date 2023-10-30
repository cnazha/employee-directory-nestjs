import { Field, InputType } from '@nestjs/graphql';
import {
  GraphQLCurrency,
  GraphQLDate,
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
} from 'graphql-scalars';

@InputType()
export class CreateEmployeeInput {
  @Field(() => GraphQLEmailAddress, { description: 'Employee email address' })
  email: string;
  @Field(() => String, { description: 'Employee first name' })
  firstName: string;
  @Field(() => String, { description: 'Employee last name' })
  lastName: string;
  @Field(() => GraphQLPhoneNumber, { description: 'Employee phone number' })
  phone: string;
  @Field(() => GraphQLDate, {
    nullable: true,
    description: 'Employee birthdate',
  })
  birthdate: Date;
  @Field(() => GraphQLCurrency)
  salaryCurrency: string;
}
