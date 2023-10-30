import { Field, ObjectType } from '@nestjs/graphql';
import { SingleMutationResponse } from '../common/responses/single-mutation.response';
import { Department } from './entities/department.entity';

import { Paginated } from '../common/pagination/pagination.generic';

@ObjectType()
export class DepartmentsListResponse extends Paginated(Department) {
  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@ObjectType()
export class CreateDepartmentMutationResponse extends SingleMutationResponse(
  Department,
) {}

@ObjectType()
export class UpdateDepartmentMutationResponse extends SingleMutationResponse(
  Department,
) {}

@ObjectType()
export class RemoveDepartmentMutationResponse extends SingleMutationResponse(
  Department,
) {}
