export default class PaginationResponse<T> {
  data: T[];

  meta: {
    total: number;
  };

  constructor(data: T[], total: number) {
    this.data = data;
    this.meta = {
      total,
    };
  }

  static make<T>(data: T[], total: number) {
    return new PaginationResponse(data, total);
  }
}
