import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { MongooseModule } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Employee.name,
        useFactory: () => EmployeeSchema.plugin(paginate),
      },
    ]),
  ],
  providers: [EmployeesResolver, EmployeesService],
})
export class EmployeesModule {}
