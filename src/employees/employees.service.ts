import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';

@Injectable()
export class EmployeesService {
  create(createEmployeeInput: CreateEmployeeInput) {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: string) {
    return `This action returns a #${id} employee`;
  }

  update(id: string, updateEmployeeInput: UpdateEmployeeInput) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return `This action removes a #${id} employee`;
  }
}
