import { Field, ObjectType } from '@nestjs/graphql';
import { SingleMutationResponse } from '../common/responses/single-mutation.response';
import { Paginated } from '../common/types/pagination.type';
import { Employee } from './entities/employee.entity';

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
