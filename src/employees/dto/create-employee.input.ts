import { Field, InputType } from '@nestjs/graphql';
import {
  GraphQLCurrency,
  GraphQLDate,
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
} from 'graphql-scalars';
import { ImageInput } from '../../common/images/image.input';

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
  @Field(() => String, {
    nullable: true,
  })
  department: string;
  @Field(() => String, {
    nullable: true,
  })
  jobTitle: string;

  @Field(() => ImageInput, {
    nullable: true,
  })
  avatar: ImageInput;
}
