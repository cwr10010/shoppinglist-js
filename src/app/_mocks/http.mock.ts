import { ResponseOptions, Response } from '@angular/http';

export class HttpClientStub {
  get() {}
  post() {}
  delete() {}
}

export function createResponse(object: any, status: number = 200): Promise<any> {
  return Promise.resolve(
    new Response(
      new ResponseOptions({
        body: JSON.stringify(object),
        status: status
      })
    ));
}
