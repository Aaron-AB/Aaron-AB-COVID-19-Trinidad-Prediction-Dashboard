import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {

  constructor(
    private http:HttpClient
  ) { }

  apiCall() {
    return this.http.get<any>('https://api.covid19api.com/dayone/country/trinidad-and-tobago/status/confirmed/live');
  }


  pipeVals() {
    let i = 1;
    return this.apiCall().pipe(
      map(actions => {
        return actions.map(a => {
          return{
            cases: a.Cases,
            day: i++
          }
        })
      })
    )
  }


/*
  pipeVals() {
    let cords = new Observable<any>();
    let values = new Observable<any>();
    let i = 1;

    cords = this.apiCall().pipe(
      map(actions => {
        return actions.map(a => {
          return{
            cases: a.Cases,
            day: i++
          }
        })
      })
    )

    cords.subscribe(res => {
      values = res;
    })
    return values;
  }*/


  /*
  subscribeVals() {
    let mapped = [];
    this.pipeVals().subscribe(res => {
      mapped = res;
      console.log(mapped);
      //return mapped;
    })


    //return mapped;
  }*/
}
