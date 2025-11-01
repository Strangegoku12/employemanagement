import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError, Observable } from 'rxjs';
import { AuthapiService } from './authapi.service';
// export interface Employee {
//   _id?: string;
//   name: string;
//   email?: string;
//   employeid?: string;
//   date_of_birth?: string;
//   gender?: string;
//   marital_status?: string;
//   designation?: string;
//   department?: string;
//   salary?: string;
//   password?: string;
// }

@Injectable({
  providedIn: 'root'
})
export class EmployementapiService {

  constructor(private _http:HttpClient,private authheader:AuthapiService) { }
  baseUrl = 'http://localhost:3000/api';

  getallemployementapi(): Observable<any>{
    return this._http.get(this.baseUrl + '/getemployees').pipe(
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

   addemployement(employement:string): Observable<any> {
    const url = `${this.baseUrl}/postemployees`;
    return this._http.post(url, {employement}).pipe(
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

  deleteemployement(empid:any){
     const url = `${this.baseUrl}/deleteemployee/${empid}`;
    return this._http.delete(url).pipe(
      map((response) => {
        // manipulate or log data here
        console.log('delete Success:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }
  editemployement(empid:any, emp:any): Observable<any> {
     const url = `${this.baseUrl}/updateemployee/${empid}`;
    return this._http.put(url, {emp}).pipe(
      map((response) => {
        // manipulate or log data here
        console.log('update Success:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }
  // /updateemployee/:id/

     addleave(leave:string): Observable<any> {
    const url = `${this.baseUrl}/applyleave`;
      const headers = this.authheader.getAuthHeaders(); //
    return this._http.post(url, {leave},{headers}).pipe(
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
    getleave(): Observable<any>{
            const headers = this.authheader.getAuthHeaders(); //

    return this._http.get(this.baseUrl + '/myleaves',{headers}).pipe(
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

    deleteleave(empid:any){
     const url = `${this.baseUrl}/deleteleave/${empid}`;
           const headers = this.authheader.getAuthHeaders(); //
    return this._http.delete(url,{headers}).pipe(
      map((response) => {
        // manipulate or log data here
        console.log('delete Success:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(() => error);
      })
    );
  }
}
