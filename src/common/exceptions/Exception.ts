Error.stackTraceLimit = 10;
export abstract class Exception extends Error {
  protected statusCode: number;

  getter() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      stack: this.stack,
    };
  }
}
