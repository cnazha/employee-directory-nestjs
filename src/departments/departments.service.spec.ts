import { DepartmentsService } from './departments.service';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Department } from './entities/department.entity';

const mockDepartment = {
  name: 'Engineering',
};

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let model: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getModelToken('Department'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockDepartment),
            constructor: jest.fn().mockResolvedValue(mockDepartment),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    model = module.get<Model<Department>>(getModelToken('Department'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new cat', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockDepartment as any));
    const newCat = await service.create(mockDepartment);
    expect(newCat).toEqual(mockDepartment);
  });
});
