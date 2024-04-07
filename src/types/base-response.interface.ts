export interface BaseResponse<T = any, U = string> {
  data: T;
  message: U;
}
