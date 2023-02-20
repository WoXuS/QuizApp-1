import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AdminLogEntry } from "../models/admin-log-entry";
import { AdminService } from "../services/admin.service";

@Injectable({
  providedIn: 'root'
})
export class AdminLogsResolver implements Resolve<AdminLogEntry[]> {
  constructor(
    private adminService: AdminService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AdminLogEntry[] | Observable<AdminLogEntry[]> | Promise<AdminLogEntry[]> {
    return this.adminService.getLogs();
  }
}
