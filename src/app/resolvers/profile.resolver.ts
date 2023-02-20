import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Profile } from "../models/profile";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private userService: UserService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Profile | Observable<Profile> | Promise<Profile> {
    return this.userService.getProfile();
  }
}
