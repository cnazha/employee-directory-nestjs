import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as moment from 'moment';
import {
  GraphQLCurrency,
  GraphQLDate,
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
  GraphQLPositiveInt,
} from 'graphql-scalars';
import {
  AddressEntity,
  AddressSchema,
} from '../../common/entities/address.entity';
import { ImageEntity, ImageSchema } from '../../common/entities/image.entity';
import { BaseDocumentEntity } from '../../common/entities/base.document';
import { UserInterface } from '../../common/interfaces/user.interface';

@Schema({
  timestamps: true,
  collection: 'employees',
  virtuals: true,
})
@ObjectType({
  implements: () => [UserInterface],
})
export class Employee extends BaseDocumentEntity implements UserInterface {
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false, description: 'First name' })
  firstName: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false, description: 'Last name' })
  lastName: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Prop({
    type: Date,
    required: false,
  })
  @Field(() => GraphQLDate, {
    nullable: true,
    description: 'Employee Birthdate - example 2000-01-20',
  })
  birthdate: Date;

  @Field(() => GraphQLPositiveInt, { nullable: true })
  age: number;

  @Prop({
    type: ImageSchema,
    required: false,
  })
  @Field(() => ImageEntity, { nullable: true })
  avatar: ImageEntity;

  @Prop({
    type: String,
    required: true,
  })
  @Field(() => GraphQLEmailAddress, { nullable: false })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  @Field(() => GraphQLPhoneNumber, { nullable: false })
  phone: string;

  @Prop({
    type: String,
  })
  @Field(() => GraphQLCurrency, { nullable: true })
  salaryCurrency: string;

  @Prop({
    type: AddressSchema,
    required: false,
  })
  @Field(() => AddressEntity, { nullable: true })
  address: AddressEntity;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

export type EmployeeDocument = HydratedDocument<Employee>;

EmployeeSchema.pre<EmployeeDocument>('save', function (next) {
  // Update the 'name' field based on 'firstName' and 'lastName'
  this.name = `${this.firstName} ${this.lastName}`;
  next();
});

EmployeeSchema.virtual('age').get(function (this: EmployeeDocument) {
  const birthdate = moment(this.birthdate);
  const currentDate = moment();
  const age = currentDate.diff(birthdate, 'years');
  return age;
});
