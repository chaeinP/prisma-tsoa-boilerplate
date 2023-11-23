export class ResponsePayload<T> {
  result: 'SUCCESS';
  data?: T;

  constructor(data?: T) {
    this.result = 'SUCCESS';
    if (data) this.data = data;
  }
}
