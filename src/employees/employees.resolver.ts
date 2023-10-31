import { Args, Directive, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { EmployeeFilterInput } from './dto/filter-employee.input';
import { SortEmployeeInput } from './dto/sort-employee.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver(() => Employee)
@UseGuards(AuthGuard)
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
  async findAll(
    @Args('pagination', {
      nullable: true,
    })
    pagination: PaginationInput,
    @Args('filter', {
      nullable: true,
    })
    filter: EmployeeFilterInput,
    @Args('sort', {
      nullable: true,
    })
    sort?: SortEmployeeInput,
  ) {
    try {
      const data = await this.employeesService.findAll(
        filter,
        pagination,
        sort,
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
  @Directive(
    '@deprecated(reason: "This mutation will be removed in the next version, pending the HR Service")',
  )
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
    try {
      const item = this.employeesService.remove(id);
      return {
        success: true,
        message: 'Employee removed successfully',
        item,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
