import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { PaginateModel } from 'mongoose';
import { UpdateEmployeeStatusInput } from './dto/update-employee-status.input';
import {
  IPaginatedType,
  PaginationArgs,
} from '../common/types/pagination.type';
import { EmployeeStatus } from './types/employee-status.enum';

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
    },
    pagination?: PaginationArgs,
  ): Promise<IPaginatedType<Employee>> {
    const name = filter?.name;
    const status = filter?.status;
    const query = {};

    if (name) {
      query['$text'] = {
        $search: name,
      };
    }
    if (status) {
      query['status'] = status;
    }

    const result = await this.employeeModel.paginate(query, {
      page: pagination.page,
      limit: pagination.limit,
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
    return `This action removes a #${id} employee`;
  }
}
