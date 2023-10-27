import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';
import { InjectModel } from '@nestjs/mongoose';
import {
  IPaginatedType,
  PaginationArgs,
} from '../common/types/pagination.type';
import { PaginateModel } from 'mongoose';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: PaginateModel<Department>,
  ) {}
  create(createDepartmentInput: CreateDepartmentInput) {
    return this.departmentModel.create(createDepartmentInput);
  }

  async findAll(
    filter?: { name?: string },
    pagination?: PaginationArgs,
  ): Promise<IPaginatedType<Department>> {
    const name = filter?.name || '';
    const query = {
      //name: { $regex: filter.name, $options: 'i' },
    };

    const result = await this.departmentModel.paginate(query, {
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

  async findOne(id: string) {
    const item = await this.departmentModel.findById(id);
    if (!item) throw new Error('Department not found');
    return item;
  }

  update(id: string, updateDepartmentInput: UpdateDepartmentInput) {
    const item = this.departmentModel.findByIdAndUpdate(
      id,
      updateDepartmentInput,
      {
        new: true,
      },
    );
    if (!item) throw new Error('Department not found');
    return item;
  }

  async remove(id: string) {
    const item = await this.departmentModel.findByIdAndRemove(id);
    if (!item) throw new Error('Department not found');
    return item;
  }
}
