import { Field, ID, InterfaceType } from '@nestjs/graphql';
import {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLPhoneNumber,
  GraphQLPositiveInt,
} from 'graphql-scalars';
import { BaseDocumentInterface } from './base-document.interface';

@InterfaceType()
export abstract class UserInterface implements BaseDocumentInterface {
  @Field(() => ID, { nullable: false })
  id: string;
  @Field(() => String, { nullable: false })
  firstName: string;
  @Field(() => String, { nullable: false })
  lastName: string;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => GraphQLEmailAddress, { nullable: false })
  email: string;
  @Field(() => GraphQLPhoneNumber, { nullable: true })
  phone: string;
  @Field(() => GraphQLDate, { nullable: true })
  birthdate: Date;
  @Field(() => GraphQLPositiveInt, { nullable: true })
  age: number;
  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date;
  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date;
}
