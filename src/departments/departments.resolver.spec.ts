import { Test, TestingModule } from '@nestjs/testing';
import { Department } from './entities/department.entity';
import { DepartmentsResolver } from './departments.resolver';

type DepartmentMock = Pick<Department, 'id' | 'name'>;

const mockDepartment: DepartmentMock = {
  id: '64a8eb89-c22c-45e2-b534-539a18057f77',
  name: 'Engineering',
};

const departmentsServiceMock = {
  findOne: jest.fn((id: string): DepartmentMock => mockDepartment),
};

describe('DepartmentsResolver', () => {
  let resolver: DepartmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsResolver,
        { provide: DepartmentsResolver, useValue: departmentsServiceMock },
      ],
    }).compile();

    resolver = module.get<DepartmentsResolver>(DepartmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single department', async () => {
    const result = await resolver.findOne(mockDepartment.id);
    expect(result.id).toEqual(mockDepartment.id);
  });
});
