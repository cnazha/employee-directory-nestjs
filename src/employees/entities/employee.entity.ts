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
import { ImageEntity, ImageSchema } from '../../common/images/image.entity';
import { BaseDocumentEntity } from '../../common/entities/base.document';
import { UserInterface } from '../../common/interfaces/user.interface';
import { EmployeeStatus } from '../types/employee-status.enum';
import { Department } from '../../departments/entities/department.entity';

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

  @Prop({
    type: String,
    required: false,
  })
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
  @Field(() => GraphQLCurrency, {
    nullable: true,
    deprecationReason:
      'This field has been deprecated in favor of the Accounting Service',
  })
  salaryCurrency: string;

  @Prop({
    type: String,
    enum: EmployeeStatus,
    default: EmployeeStatus.INACTIVE,
  })
  @Field(() => EmployeeStatus, { defaultValue: EmployeeStatus.INACTIVE })
  status: EmployeeStatus;

  @Prop({
    type: AddressSchema,
    required: false,
  })
  @Field(() => AddressEntity, { nullable: true })
  address: AddressEntity;

  @Prop({
    type: String,
    required: false,
    ref: 'Department',
    autopopulate: true,
  })
  @Field(() => Department, { nullable: true })
  department?: Department | string;

  @Prop({
    type: String,
    required: false,
  })
  @Field(() => String, { nullable: true })
  jobTitle: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

export type EmployeeDocument = HydratedDocument<Employee>;

EmployeeSchema.virtual('age').get(function (this: EmployeeDocument) {
  const birthdate = moment(this.birthdate);
  const currentDate = moment();
  const age = currentDate.diff(birthdate, 'years');
  return age;
});

EmployeeSchema.pre<EmployeeDocument>('save', function (next) {
  if (this.isModified('firstName') || this.isModified('lastName')) {
    this.name = `${this.firstName} ${this.lastName}`;
  }
  next();
});

EmployeeSchema.pre<EmployeeDocument & any>(
  ['findOneAndUpdate', 'updateOne'],
  async function (next) {
    const update = this.getUpdate();
    if (update.firstName || update.lastName) {
      const doc = await this.model.findOne(this.getQuery());
      if (!doc) {
        throw new Error('Employee not found');
      }
      const firstName = update.firstName || doc.firstName;
      const lastName = update.lastName || doc.lastName;
      this._update.name = `${firstName} ${lastName}`;
    }
    next();
  },
);

EmployeeSchema.index({ name: 'text' });
