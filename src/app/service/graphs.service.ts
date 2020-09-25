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

  async plotExp() {

  }

}
