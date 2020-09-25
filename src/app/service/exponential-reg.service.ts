import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ExponentialRegService {
  xs = [];
  ys = [];

  constructor() {
   }

  a = tf.variable(tf.scalar(Math.random()));
  b = tf.variable(tf.scalar(Math.random()));
  c = tf.variable(tf.scalar(Math.random()));

  epochs: number = 1500;
  learningRate = 0.01;
  optimizer = tf.train.adam(this.learningRate);

  passValues(xs, ys) {
    console.log(xs, ys);
    let xts = this.createXTensors(xs);
    let yts = this.createYTensors(ys);
    this.train(xts, yts, this.epochs);
  }

  createXTensors(xs) {
    let xTensors = tf.tensor1d(xs);
    return xTensors;
  }

  createYTensors(ys) {
    let yTensors = tf.tensor1d(ys);
    let min = yTensors.min();
    let max = yTensors.max();
    let range = max.sub(min);
    let yTensorsNorm = yTensors.sub(min).div(range);
    return yTensorsNorm;
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
