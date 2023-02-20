import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected readonly apiUrl: string = 'https://localhost:4200/api/';

  constructor(
    protected http: HttpClient,
  ) {
  }
}
