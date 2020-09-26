import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetAPIService } from './get-api.service';
import * as tf from '@tensorflow/tfjs';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ExponentialRegService } from './service/exponential-reg.service'
import { GraphsService } from './service/graphs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'LinearReg';
  private subscription: Subscription;
  xs = [];
  ys = [];

  public mapped = [];

  constructor( private api:GetAPIService,
               private tens: ExponentialRegService,
               private graph: GraphsService ) {
   }


  ngOnInit(){
    this.api.pipeVals().subscribe(res =>{
      this.mapped = res;
      console.log(this.mapped);



      this.graph.plotData(res);

      //this.tens.passValues(this.xs, this.ys);


      //SENDING TO GRAPH SERVICE TO TRAIN
      //await this.graph.plotTrained(this.xs, this.ys);
    });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async trainModel() {
    //console.log(this.mapped);
    let obj = this.convertObject(this.mapped);
    let xs = obj.xs;
    let ys = obj.ys;
    //console.log(xs, ys);
    //console.log(this.tens.passValues(xs,ys));
    let newObj = await this.tens.passValues(xs, ys);
    //console.log(newObj);


    await this.graph.plotTrained(newObj.xts, newObj.yts, newObj.predVal);
    //ABOVE WORKS
    /*
    let nxs = newObj.xts;
    let yxs = newObj.yts;
    let npred = newObj.predVal;*/

  }

  convertObject(mapped) {
    //console.log(mapped);
    let xs = [];
    let ys = [];
    for(let i=0; i < mapped.length; i++) {
      xs.push(mapped[i].x);
      ys.push(mapped[i].y);
    }
    return {xs, ys};
  }
}
