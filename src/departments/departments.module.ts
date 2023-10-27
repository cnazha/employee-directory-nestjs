import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './entities/department.entity';
import * as paginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Department.name,
        useFactory: () => DepartmentSchema.plugin(paginate),
      },
    ]),
  ],
  providers: [DepartmentsResolver, DepartmentsService],
})
export class DepartmentsModule {}
