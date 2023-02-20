import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminLogEntry } from "../models/admin-log-entry";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends ApiService {
  public getLogs(): Observable<AdminLogEntry[]> {
    return this.http.get<AdminLogEntry[]>(this.apiUrl + 'admin/log');
  }
}
