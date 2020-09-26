import { Injectable } from '@angular/core';
import * as tfvis from '@tensorflow/tfjs-vis'

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  constructor() {}

  async plotData(mapArr) {
    // Simplest case: Line chart with only one series.
    let values = mapArr;
    tfvis.render.scatterplot(document.getElementById('container'), {values}, {
      width: 400
    });
  }

  async plotTrained(xs, ys, predictionsAfter) {
    let xvals = await xs.data();
    let yvals = await ys.data();
    let pred = await predictionsAfter.data();
    //console.log(xvals, yvals, pred);
    //ABOVE WORKS
    let mapped = this.mapVals(xvals, yvals, pred);
    //console.log(mapped);

  }

  mapVals(xs, ys, pred) {
    let values = Array.from(ys).map((y, i) => {
      console.log({'x': xs[i], 'y': ys[i], pred: pred[i]});
      return {'x': xs[i], 'y': ys[i], pred: pred[i]};
    });
  }

}
