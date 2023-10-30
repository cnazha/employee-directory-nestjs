import { Prop, Schema } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { documentIDGenerator } from '../helpers/document-id-generator';
import { GraphQLDateTime } from 'graphql-scalars';

@Schema({
  _id: false,
  timestamps: true,
  toJSON: { getters: true },
})
@ObjectType()
export class BaseDocumentEntity {
  @Prop({
    type: String,
    default: documentIDGenerator,
  })
  _id: string;

  @Prop({
    type: String,
    virtual: true,
    get() {
      return this._id;
    },
  })
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date;
}
