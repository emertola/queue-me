export interface IPaginated<T = any> {
  currentPage: number;
  pageSize: number;
  results: T[];
  totalElements: number;
  hasNextPage?: boolean;
}
