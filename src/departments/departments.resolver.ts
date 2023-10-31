import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import {
  CreateDepartmentMutationResponse,
  DepartmentsListResponse,
  RemoveDepartmentMutationResponse,
  UpdateDepartmentMutationResponse,
} from './departments.responses';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver(() => Department)
@UseGuards(AuthGuard)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => CreateDepartmentMutationResponse)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    try {
      const department = await this.departmentsService.create(
        createDepartmentInput,
      );
      return {
        item: department,
        success: true,
        message: 'Department created successfully',
      };
    } catch (e) {
      let message = e.message;
      if (e.code === 11000) {
        message = 'Department already exists';
      }
      return {
        item: null,
        success: false,
        message,
      };
    }
  }

  @Query(() => DepartmentsListResponse, { name: 'departments' })
  async findAll() {
    try {
      const data = await this.departmentsService.findAll(
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

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => UpdateDepartmentMutationResponse)
  async updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    try {
      const item = await this.departmentsService.update(
        updateDepartmentInput.id,
        updateDepartmentInput,
      );
      return {
        item,
        success: true,
        message: 'Department updated successfully',
      };
    } catch (e) {
      return {
        item: null,
        success: false,
        message: e.message,
      };
    }
  }

  @Mutation(() => RemoveDepartmentMutationResponse)
  async removeDepartment(@Args('id', { type: () => String }) id: string) {
    try {
      const item = await this.departmentsService.remove(id);
      return {
        item,
        success: true,
        message: 'Department removed successfully',
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
