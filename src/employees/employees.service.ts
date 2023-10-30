import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.entity';
import { Model } from 'mongoose';
import { UpdateEmployeeStatusInput } from './dto/update-employee-status.input';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}
  create(createEmployeeInput: CreateEmployeeInput) {
    return this.employeeModel.create(createEmployeeInput);
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: string) {
    return `This action returns a #${id} employee`;
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
