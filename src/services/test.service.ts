import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  apiUrl:string;

  constructor(protected httpClient : HttpClient) { 
    this.apiUrl = environment.apiURL
  }

  static get headers() : HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', '*/*');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,HEAD');
    headers = headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language','tr-TR');

    return headers;
  }

  public get(url:string, params:HttpParams= new HttpParams()) : Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + url, {headers : TestService.headers, params});
  }

  public post(url:string, data:any):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl + url, data, {headers : TestService.headers});
  }


}
