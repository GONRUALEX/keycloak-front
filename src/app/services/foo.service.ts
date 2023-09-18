import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from '../models/foo';

@Injectable({
  providedIn: 'root'
})
export class FooService {
  fooUrl = "http://localhost:8090/foo/"

  httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})}
  constructor(private httpClient: HttpClient) { }

  public list():Observable<Foo[]>{
    return this.httpClient.get<Foo[]>(this.fooUrl+'list', this.httpOptions);
  }

  public detail(id:number):Observable<Foo>{
    return this.httpClient.get<Foo>(this.fooUrl+`detail/${id}`, this.httpOptions);
  }

  public create(foo:Foo):Observable<any>{
    return this.httpClient.post<any>(this.fooUrl+'create',foo,this.httpOptions);
  }

  public update(id:number, foo:Foo):Observable<any>{
    return this.httpClient.put<any>(this.fooUrl+`update/${id}`, foo, this.httpOptions);
  }
}
