import { Component, OnInit } from '@angular/core';
import { GetAPIService } from './get-api.service';
import * as tf from '@tensorflow/tfjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'LinearReg';


  a = tf.variable(tf.scalar(Math.random()));
  b = tf.variable(tf.scalar(Math.random()));
  c = tf.variable(tf.scalar(Math.random()));

  epochs: number = 1500;
  learningRate = 0.01;
  optimizer = tf.train.adam(this.learningRate);


  xs = [];
  ys = [];

  public cords = new Observable<any>();
  public mapped = [];
  xTensors: any;
  yTensors: any;
  yTensorsNorm: any;

  constructor( private api:GetAPIService ) {
   }

  ngOnInit(){
    let i = 1;

    this.api.pipeVals().subscribe(res =>{
      this.mapped = res;
      this.convertObject();
      this.createTensors();
      this.normalizeTensors();
      this.train(this.xTensors, this.yTensorsNorm, this.epochs);
    })

  }

  /*
  getCases() {
    this.cords.subscribe(res => {
      this.mapped = res;
      //console.log(this.mapped);
    })
    return this.mapped;
    //console.log(this.mapped);
  }*/

  convertObject() {
    let maps = this.mapped;
    for(let i=0; i < maps.length; i++) {
      //console.log(maps[i]);
      this.xs.push(maps[i].day);
      this.ys.push(maps[i].cases);
    }
    //console.log(this.xs);
    //console.log(this.ys);

  }

  createTensors() {
    this.xTensors = tf.tensor1d(this.xs);
    this.yTensors = tf.tensor1d(this.ys);
    //console.log(this.xTensors, this.yTensors);
  }

  normalizeTensors(){
    let min = this.yTensors.min();
    let max = this.yTensors.max();
    let range = max.sub(min);
    this.yTensorsNorm = this.yTensors.sub(min).div(range);
  }

  predict(x) {
    return tf.tidy(() => {
      return this.a.mul(x.square()).add(this.b.mul(x)).add(this.c)
    });
  }

  loss(preds, ys) {
    return preds.sub(ys).square().mean();
  }

  train(xs, ys, epochs) {
    for(let i=0; i<epochs; i++){
      this.optimizer.minimize(() => {
        const pred = this.predict(xs);
        console.log(this.loss(pred,ys).dataSync());
        return this.loss(pred, ys);
      })
      console.log(`Epoch #{i} a: ${this.a.dataSync()[0]}, b: ${this.b.dataSync()[0]}, c: ${this.c.dataSync()[0]}`)
    }
  }
}
