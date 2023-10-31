import {
  Args,
  Directive,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { DepartmentsService } from '../departments/departments.service';
import { Department } from '../departments/entities/department.entity';

@Resolver(() => Employee)
@UseGuards(AuthGuard)
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly departmentService: DepartmentsService,
  ) {}

  @Mutation(() => CreateEmployeeMutationResponse)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    try {
      const employee = await this.employeesService.create(createEmployeeInput);
      return {
        success: true,
        message: 'Employee created successfully',
        item: employee,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Query(() => EmployeesListResponse, { name: 'employees' })
  async findAll(
    @Args('pagination', {
      nullable: true,
      defaultValue: {
        page: 1,
        limit: 10,
      },
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
      console.log(e);
      return {
        items: [],
        totalCount: 0,
        success: false,
        message: e.message,
      };
    }
  }

  @Query(() => Employee, { name: 'employee' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      const employee = await this.employeesService.findOne(id);
      if (!employee) throw new Error('Employee not found');
      return employee;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
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

  // Used resolve field instead of populate for demo only
  @ResolveField(() => Department, { name: 'department' })
  async employeeDepartment(@Parent() employee: Employee) {
    try {
      // TODO - Implement DataLoader
      const departmentId = employee.department as string;
      if (departmentId) {
        const department = await this.departmentService.findOne(departmentId);
        return department;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
