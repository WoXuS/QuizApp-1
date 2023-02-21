import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected readonly apiUrl: string = 'https://taiquizapp.azurewebsites.net/api/';

  constructor(
    protected http: HttpClient,
  ) {
  }
}
