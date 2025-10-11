import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:3000/api';
 login(login:string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, {login}).pipe(
      map((response) => {
        // manipulate or log data here

        const token=response.token
        localStorage.setItem('token',token)
        console.log('Login Success:', token);
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }


  //register
   register(register:string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, {register}).pipe(
      map((response) => {
        // manipulate or log data here
        console.log('register  Success:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }

   getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if(!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
