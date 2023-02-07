import { HttpClient } from "@angular/common/http";

export class ApiService {
  protected readonly apiUrl: string = 'https://localhost:7182/';

  constructor(
    protected http: HttpClient,
  ) {
  }
}
