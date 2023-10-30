import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class SortDocumentsInput {
  @Field(() => SortOrder, {
    nullable: true,
    defaultValue: SortOrder.DESC,
  })
  createdAt: SortOrder;
  @Field(() => SortOrder, {
    nullable: true,
  })
  updatedAt: SortOrder;
}
