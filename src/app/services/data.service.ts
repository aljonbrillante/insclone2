import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = `${environment.Api}`;


  constructor(private http: HttpClient) { }


  getrandomfeed(dataFilters,callback): any {
    console.log(dataFilters)
    this.http.get(`https://randomuser.me/api/?page=${dataFilters.page}&results=10&seed=feed`).subscribe(
      data => (callback(null, data)),
      err => (callback(null, err))
    );
  }

  getrandomphotos(dataFilters,callback): any {
    console.log(dataFilters)
    this.http.get(`https://picsum.photos/v2/list?page=${dataFilters.page}&limit=10`).subscribe(
      data => (callback(null, data)),
      err => (callback(null, err))
    );
  }

  getrandomprofile(dataFilters,callback): any {
    console.log(dataFilters)
    this.http.get(`https://randomuser.me/api/`).subscribe(
      data => (callback(null, data)),
      err => (callback(null, err))
    );
  }
  
}
