import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {

  activeCases = 'https://api.covid19api.com/live/country/trinidad-and-tobago/status/confirmed';
  numCases = 'https://api.covid19api.com/dayone/country/trinidad-and-tobago/status/confirmed/live';
  constructor(
    private http:HttpClient
  ) { }

  apiCall() {
    return this.http.get<any>(this.numCases);
  }


  pipeVals() {
    let i = 1;
    return this.apiCall().pipe(
      map(actions => {
        return actions.map(a => {
          return{
            x: i++,
            y: a.Cases//change back to Cases
          }
        })
      })
    )
  }
}
