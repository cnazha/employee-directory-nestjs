import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { PaginateModel } from 'mongoose';
import { UpdateEmployeeStatusInput } from './dto/update-employee-status.input';
import { IPaginatedType } from '../common/pagination/pagination.type';
import { EmployeeStatus } from './types/employee-status.enum';
import { PaginationArgs } from '../common/pagination/pagination.input';

import { SortOrder } from '../common/sort/sort.input';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: PaginateModel<Employee>,
  ) {}
  create(createEmployeeInput: CreateEmployeeInput) {
    return this.employeeModel.create(createEmployeeInput);
  }

  async findAll(
    filter?: {
      name?: string;
      status?: EmployeeStatus;
      department?: string;
    },
    pagination?: PaginationArgs,
    sort?: {
      name?: string;
      createdAt?: SortOrder;
      updatedAt?: SortOrder;
    },
  ): Promise<IPaginatedType<Employee>> {
    const name = filter?.name;
    const status = filter?.status;
    const department = filter?.department;
    const query = {};

    if (name) {
      query['$text'] = {
        $search: name,
      };
    }
    if (status) {
      query['status'] = status;
    }

    if (department) {
      query['department'] = department;
    }

    const result = await this.employeeModel.paginate(query, {
      page: pagination.page,
      limit: pagination.limit,
      sort: sort,
      collation: {
        locale: 'en',
      },
    });

    return {
      items: result.docs,
      totalCount: result.totalDocs,
      hasNextPage: result.hasNextPage,
      page: result.page,
      totalPages: result.totalPages,
    };
  }

  findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  update(id: string, updateEmployeeInput: UpdateEmployeeInput) {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeInput, {
      new: true,
    });
  }

  updateStatus(id: string, updateStatus: UpdateEmployeeStatusInput) {
    return this.employeeModel.findByIdAndUpdate(id, updateStatus, {
      new: true,
    });
  }

  remove(id: string) {
    return this.employeeModel.findByIdAndDelete(id);
  }
}
