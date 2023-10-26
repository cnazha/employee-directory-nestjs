import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocumentEntity } from '../../common/entities/base.document';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'departments',
  timestamps: true,
})
@ObjectType()
export class Department extends BaseDocumentEntity {
  @Field(() => String, { description: 'Department name', nullable: false })
  name: string;
}

export type DepartmentDocument = HydratedDocument<Department>;
export const DepartmentSchema = SchemaFactory.createForClass(Department);
