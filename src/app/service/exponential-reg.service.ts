import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ExponentialRegService {

  constructor() {
   }

  a = tf.variable(tf.scalar(Math.random()));
  b = tf.variable(tf.scalar(Math.random()));
  c = tf.variable(tf.scalar(Math.random()));
  d = tf.variable(tf.scalar(Math.random()));

  epochs: number = 400;
  learningRate = 0.001;
  optimizer = tf.train.adam(this.learningRate);

  async passValues(xs, ys) {
    //console.log(xs, ys);

    let xts = this.createXTensors(xs);
    let yts = this.createYTensors(ys);
    let predValBefore = this.predict(xts);
    await this.train(xts, yts, this.epochs);
    let predVal = this.predict(xts);
    return {xts, yts, predVal, predValBefore}
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

    //return yTensorsNorm;
    return yTensors;
  }

  predict(x) {
    return tf.tidy(() => {
      //return this.a.mul(x.square()).add(this.b.mul(x)).add(this.c)
      return this.a.mul(x.pow(tf.scalar(3, 'int32'))).add(this.b.mul(x.square())).add(this.c.mul(x)).add(this.d);
    });
  }

  loss(preds, ys) {
    return preds.sub(ys).square().mean();
  }

  async train(xs, ys, epochs) {
    for(let i=0; i<epochs; i++){
      this.optimizer.minimize(() => {
        const pred = this.predict(xs);
        //console.log(this.loss(pred,ys).dataSync());
        return this.loss(pred, ys);
      })
      //console.log(`Epoch #{i} a: ${this.a.dataSync()[0]}, b: ${this.b.dataSync()[0]}, c: ${this.c.dataSync()[0]}`)
    }
  }







}
