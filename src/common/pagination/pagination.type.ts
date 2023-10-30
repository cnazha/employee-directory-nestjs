export interface IPaginatedType<T> {
  items: T[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
  totalPages?: number;
}
