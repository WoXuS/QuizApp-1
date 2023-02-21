import { Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { Profile } from "../models/profile";
import { SaveProfileDto } from "../models/save-profile-dto";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  public currentUserName: string = '';

  public getUserName(id: string): Observable<string> {
    return this.http.get(this.apiUrl + `account/username?userId=${id}`, { responseType: 'text' });
  }

  public getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl + 'account/details');
  }

  public getUserId(jwt: string): string {
    const data = JSON.parse(atob(jwt.split('.')[1]));
    return data.userId;
  }

  public saveUserData(data: SaveProfileDto): Observable<undefined> {
    return this.http.put<undefined>(this.apiUrl + 'account/credentials', data);
  }

  public isUserAdmin(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.getProfile().pipe(take(1)).subscribe({
        next: (profile) => observer.next(profile.roles.includes('Admin')),
        error: () => observer.next(false)
      });
    });
  }

  public saveUserEmail(email: string): Observable<undefined> {
    return this.http.put<undefined>(this.apiUrl + `account/email?emailAddress=${email}`, null);
  }
}
