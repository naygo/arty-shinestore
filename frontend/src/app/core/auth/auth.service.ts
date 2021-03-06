import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { tap } from 'rxjs/operators';
import { AuthResponse } from './auth';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  authenticate(email: string, password: string) {
    return this.http
    .post<AuthResponse>(API_URL + '/login', { email, password }, { observe: 'response' })
    .pipe(tap(res => {
      const token = res.body.token;
      this.userService.setToken('Bearer ' + token);
    }))
  }
}
