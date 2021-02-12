import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getUsersData(): Observable<User[]> {
    return this.http.get<any>("assets/usersData.json").pipe(
      tap(data=> data)
    );
  }
}
