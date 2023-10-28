import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class MutationResponse {
  @Field(() => Boolean, { nullable: false, defaultValue: false })
  success: boolean;
  @Field(() => String, { nullable: true, defaultValue: null })
  message: string;
}
