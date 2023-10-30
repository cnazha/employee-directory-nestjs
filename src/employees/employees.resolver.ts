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
import { UpdateEmployeeStatusInput } from './dto/update-employee-status.input';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => CreateEmployeeMutationResponse)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    const employee = await this.employeesService.create(createEmployeeInput);
    return {
      success: true,
      message: 'Employee created successfully',
      item: employee,
    };
  }

  @Query(() => EmployeesListResponse, { name: 'employees' })
  async findAll() {
    try {
      const data = await this.employeesService.findAll(
        {},
        { page: 1, limit: 10 },
      );
      return {
        ...data,
        success: true,
      };
    } catch (e) {
      return {
        items: [],
        totalCount: 0,
        success: false,
        message: e.message,
      };
    }
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.employeesService.findOne(id);
  }

  @Mutation(() => UpdateEmployeeMutationResponse)
  async updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    try {
      const updatedEmployee = await this.employeesService.update(
        updateEmployeeInput.id,
        updateEmployeeInput,
      );
      return {
        success: true,
        message: 'Employee updated successfully',
        item: updatedEmployee,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
  @Mutation(() => UpdateEmployeeMutationResponse)
  updateEmployeeStatus(
    @Args('updateEmployeeStatusInput')
    updateEmployeeStatusInput: UpdateEmployeeStatusInput,
  ) {
    return this.employeesService.updateStatus(
      updateEmployeeStatusInput.id,
      updateEmployeeStatusInput,
    );
  }

  @Mutation(() => RemoveEmployeeMutationResponse)
  removeEmployee(@Args('id', { type: () => String }) id: string) {
    return this.employeesService.remove(id);
  }
}
