import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import {
  CreateEmployeeMutationResponse,
  EmployeesListResponse,
  RemoveEmployeeMutationResponse,
  UpdateEmployeeMutationResponse,
} from './employees.responses';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => CreateEmployeeMutationResponse)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return this.employeesService.create(createEmployeeInput);
  }

  @Query(() => [EmployeesListResponse], { name: 'employees' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.employeesService.findOne(id);
  }

  @Mutation(() => UpdateEmployeeMutationResponse)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return this.employeesService.update(
      updateEmployeeInput.id,
      updateEmployeeInput,
    );
  }

  @Mutation(() => RemoveEmployeeMutationResponse)
  removeEmployee(@Args('id', { type: () => String }) id: string) {
    return this.employeesService.remove(id);
  }
}
