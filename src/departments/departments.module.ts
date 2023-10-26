import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './entities/department.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  providers: [DepartmentsResolver, DepartmentsService],
})
export class DepartmentsModule {}
