import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDocumentEntity } from '../../common/entities/base.document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import moment from 'moment';
import { ImageEntity, ImageSchema } from '../../common/entities/image.entity';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Employee extends BaseDocumentEntity {
  @Field(() => String, { nullable: false })
  firstName: string;
  @Field(() => String, { nullable: false })
  lastName: string;
  @Prop({})
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => Date, { nullable: true })
  birthdate: Date;
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
  @Field(() => String, { nullable: false })
  email: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, { nullable: false })
  phone: string;
}

const EmployeeSchema = SchemaFactory.createForClass(Employee);

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
