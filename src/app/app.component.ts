import { Component, OnInit } from '@angular/core';
import { GetAPIService } from './get-api.service';
import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExponentialRegService } from './service/exponential-reg.service'
import { GraphsService } from './service/graphs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'LinearReg';

  xs = [];
  ys = [];

  public mapped = [];

  constructor( private api:GetAPIService,
               private tens: ExponentialRegService,
               private graph: GraphsService ) {
   }

  ngOnInit(){
    let i = 1;
    this.api.pipeVals().subscribe(res =>{
      this.mapped = res;
      this.graph.plotData(this.mapped);
      console.log(this.mapped);
      //this.convertObject();
      //this.tens.passValues(this.xs, this.ys);
    })

  }

  convertObject() {
    let maps = this.mapped;
    for(let i=0; i < maps.length; i++) {
      this.xs.push(maps[i].day);
      this.ys.push(maps[i].cases);
    }
  }
}
