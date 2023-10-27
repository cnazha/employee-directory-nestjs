import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocumentEntity } from '../../common/entities/base.document';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'departments',
  timestamps: true,
})
@ObjectType()
export class Department extends BaseDocumentEntity {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  @Field(() => String, { description: 'Department name', nullable: false })
  name: string;
}

export type DepartmentDocument = HydratedDocument<Department>;

export const DepartmentSchema = SchemaFactory.createForClass(Department);

DepartmentSchema.index({ name: 1 }, { unique: true });
