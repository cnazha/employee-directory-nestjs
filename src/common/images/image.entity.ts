import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocumentEntity } from '../entities/base.document';
import { HydratedDocument } from 'mongoose';
import { GraphQLURL } from 'graphql-scalars';

@Schema({
  _id: false,
  timestamps: true,
  toJSON: { getters: true },
})
@ObjectType()
export class ImageEntity extends BaseDocumentEntity {
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => GraphQLURL, { nullable: false, description: 'Public image URL' })
  url: string;
  @Prop({
    type: String,
    required: true,
  })
  @Field(() => String, {
    nullable: false,
    description: 'Image path on Firebase Bucket',
  })
  path: string;
  @Prop({
    type: Number,
    required: true,
  })
  @Field(() => Float, { nullable: false, description: 'Original image width' })
  width: number;
  @Prop({
    type: Number,
    required: true,
  })
  @Field(() => Float, { nullable: false, description: 'Original image height' })
  height: number;

  @Field(() => Float, {
    nullable: true,
    description: 'Image aspect ratio from width / height',
  })
  aspectRatio: number;
}

export type ImageDocument = HydratedDocument<ImageEntity>;
export const ImageSchema = SchemaFactory.createForClass(ImageEntity);

ImageSchema.virtual('aspectRatio').get(function (this: ImageDocument) {
  return this.width / this.height;
});
