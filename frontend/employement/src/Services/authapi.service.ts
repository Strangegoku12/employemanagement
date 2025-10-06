import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:3000/api';
 login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
      map((response) => {
        // manipulate or log data here
        console.log('Login Success:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }
}
