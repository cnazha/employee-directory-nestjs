import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadDocuments } from '@graphql-tools/load';
import { AppModule } from '../../src/app.module';

const gqlPath = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Departments', () => {
    const departmentMock = {
      name: 'IT',
    };

    it('should create department', async () => {
      const createDepartmentMutation = await loadDocuments(
        __dirname + '/createDepartment.graphql',
        {
          loaders: [new GraphQLFileLoader()],
        },
      );
      return request(app.getHttpServer())
        .post(gqlPath)
        .send({
          query: createDepartmentMutation[0].rawSDL,
          variables: {
            createDepartmentInput: { name: departmentMock.name },
          },
        })
        .expect(200)
        .expect((res) => {
          const responseData = res.body.data.createDepartment;
          expect(responseData.message).toEqual(
            'Department created successfully',
          );
          expect(responseData.success).toBeTruthy();
          expect(responseData.item.name).toEqual(departmentMock.name);
        });
    });
    it('should fail to create department with an existing name', async () => {
      const createDepartmentMutation = await loadDocuments(
        __dirname + '/createDepartment.graphql',
        {
          loaders: [new GraphQLFileLoader()],
        },
      );
      return request(app.getHttpServer())
        .post(gqlPath)
        .send({
          query: createDepartmentMutation[0].rawSDL,
          variables: {
            createDepartmentInput: { name: departmentMock.name },
          },
        })
        .expect(200)
        .expect((res) => {
          const responseData = res.body.data.createDepartment;
          expect(responseData.message).toEqual('Department already exists');
          expect(responseData.success).toBeFalsy();
        });
    });

    it('should fail to get department by invalid id', async () => {
      const getDepartmentByIdQuery = await loadDocuments(
        __dirname + '/getDepartment.graphql',
        {
          loaders: [new GraphQLFileLoader()],
        },
      );

      return request(app.getHttpServer())
        .post(gqlPath)
        .send({
          query: getDepartmentByIdQuery[0].rawSDL,
          variables: {
            departmentId: 'e38201d8-961d-4757-be52-0f098785abd7',
          },
        })
        .expect(200)
        .expect((res) => {
          const responseData = res.body.errors[0];
          expect(responseData.message).toEqual('Department not found');
        });
    });
  });
});
