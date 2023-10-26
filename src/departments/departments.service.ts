import { Injectable } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPaginatedType } from '../common/types/pagination.type';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}
  async create(createDepartmentInput: CreateDepartmentInput) {
    return this.departmentModel.create(createDepartmentInput);
  }

  async findAll(): Promise<IPaginatedType<Department>> {
    const query = {};
    const itemsRequest = this.departmentModel.find(query);
    const totalCountRequest = this.departmentModel.countDocuments(query);
    const requests = [itemsRequest, totalCountRequest];
    // Run in parallel
    const [itemsRes, totalCountRes] = await Promise.allSettled(requests);
    // Handle errors
    if (itemsRes.status === 'rejected') throw itemsRes.reason;
    if (totalCountRes.status === 'rejected') throw totalCountRes.reason;

    const items = itemsRes.value as Department[];
    const totalCount = totalCountRes.value as number;
    return {
      items: items,
      totalCount,
      hasNextPage: false,
      page: 1,
    };
  }

  findOne(id: string) {
    return this.departmentModel.findById(id);
  }

  update(id: string, updateDepartmentInput: UpdateDepartmentInput) {
    return this.departmentModel.findByIdAndUpdate(id, updateDepartmentInput, {
      new: true,
    });
  }

  remove(id: string) {
    return this.departmentModel.findByIdAndRemove(id);
  }
}
