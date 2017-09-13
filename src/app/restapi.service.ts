import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RestapiService {

  constructor(
    private _http: Http) {

    }

    public getUserNames(): Observable<string[]> {
      return this._http.get('https://jsonplaceholder.typicode.com/users')
        .delay(1500)
        .map(response => {
          return response.json();
        })
        .map(data  => {
          return (<Array<any>>data).map(item => <string>item['name']);
        })
        .share()
        .catch(err => {
          console.log(err);
          return Observable.throw(err);
        });
    }
}
