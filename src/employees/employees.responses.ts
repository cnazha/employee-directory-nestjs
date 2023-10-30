import { Field, ObjectType } from '@nestjs/graphql';
import { SingleMutationResponse } from '../common/responses/single-mutation.response';
import { Employee } from './entities/employee.entity';
import { Paginated } from '../common/pagination/pagination.generic';

@ObjectType()
export class EmployeesListResponse extends Paginated(Employee) {
  @Field(() => Boolean, { nullable: false })
  success: boolean;
}

@ObjectType()
export class CreateEmployeeMutationResponse extends SingleMutationResponse(
  Employee,
) {}

@ObjectType()
export class UpdateEmployeeMutationResponse extends SingleMutationResponse(
  Employee,
) {}

@ObjectType()
export class RemoveEmployeeMutationResponse extends SingleMutationResponse(
  Employee,
) {}
