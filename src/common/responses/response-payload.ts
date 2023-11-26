export class ResponsePayload<T> {
  result: 'SUCCESS';
  data: T | null;

  constructor(data?: T) {
    this.result = 'SUCCESS';
    this.data = data ?? null;
  }
}
