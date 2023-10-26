import { Prop, Schema } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { documentIDGenerator } from '../helpers/document-id-generator';

@Schema({
  _id: false,
  timestamps: true,
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
    get: function () {
      return this.id;
    },
  })
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
