import { Field, Float, InputType } from '@nestjs/graphql';
import { GraphQLURL } from 'graphql-scalars';

@InputType()
export class ImageInput {
  @Field(() => GraphQLURL, { nullable: false, description: 'Public image URL' })
  url: string;
  @Field(() => String, {
    nullable: false,
    description: 'Image path on Firebase Bucket',
  })
  path: string;
  @Field(() => Float, { nullable: false, description: 'Original image width' })
  width: number;
  @Field(() => Float, { nullable: false, description: 'Original image height' })
  height: number;
}
