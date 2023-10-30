import { Field, InputType } from '@nestjs/graphql';

import { SortDocumentsInput, SortOrder } from '../../common/sort/sort.input';

@InputType()
export class SortEmployeeInput extends SortDocumentsInput {
  @Field(() => SortOrder, {
    nullable: true,
  })
  name: SortOrder;
}
