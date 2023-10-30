import { registerEnumType } from '@nestjs/graphql';

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

registerEnumType(EmployeeStatus, { name: 'EmployeeStatus' });
