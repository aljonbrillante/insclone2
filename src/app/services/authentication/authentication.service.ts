import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';
 
const TOKEN_KEY = 'my-token';
const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
 
  private url = `${environment.Api}`;

  constructor(private http: HttpClient) {
    this.loadToken();
  }
 
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  // getLogin(logindata,callback): any {
  //   const headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*'
  //   });
  //   this.http.get(`${this.url}/api/user/login/`, logindata , {headers: headers})
  //   .subscribe(
  //     data => (callback(null, data)),
  //     err => (callback(null, err))
  //   );
  // }

  getLogin(logindata,callback): any {
    console.log(JSON.stringify(logindata))
      this.http.post(`${this.url}/api/user/login/`, logindata, options).subscribe(
      data => (callback(null, data)),
      err => (callback(null, err))
    );
  }

 
  // getLogin(logindata): Observable<any> {
  //   return this.http.get(`https://localhost:44316/api/user/getvehicle/`).pipe(
  //     map((data: any) => data.token),
  //     switchMap(token => {
  //       return from(Storage.set({key: TOKEN_KEY, value: token}));
  //     }),
  //     tap(_ => {
  //       this.isAuthenticated.next(true);
  //     })
  //   )
  // }
 
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}