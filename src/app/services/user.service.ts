import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  public getUserName(id: string): Observable<string> {
    return this.http.get(this.apiUrl + `account/username?userId=${id}`, { responseType: 'text' });
  }
}
