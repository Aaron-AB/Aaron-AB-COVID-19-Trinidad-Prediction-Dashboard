import { Injectable } from '@angular/core';
import * as tfvis from '@tensorflow/tfjs-vis'
import renderChart from 'vega-embed';


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
    let predVals = await predictionsAfter.data();
    //console.log(xvals, yvals, pred);
    //ABOVE WORKS
    let values = this.mapVals(xvals, yvals, predVals);
    console.log(values);
    //ABOVE WORKS
    //console.log()


    const spec = {
      '$schema': 'https://vega.github.io/schema/vega-lite/v4.16.7.json',
      'width': 300,
      'height': 300,
      'data': {'values': values},
      'layer': [
        {
          'mark': 'point',
          'encoding': {
            'x': {'field': 'x', 'type': 'quantitative'},
            'y': {'field': 'y', 'type': 'quantitative'}
          }
        },
        {
          'mark': 'line',
          'encoding': {
            'x': {'field': 'x', 'type': 'quantitative'},
            'y': {'field': 'pred', 'type': 'quantitative'},
            'color': {'value': 'tomato'}
          },
        }
      ]
    };

    return renderChart(document.getElementById('container2'), spec, {actions: false});
    //tfvis.render.linechart(document.getElementById('container'), spec, {actions: false});

  }

  mapVals(xs, ys, pred) {
    let values = Array.from(ys).map((y, i) => {
      //console.log({'x': xs[i], 'y': ys[i], pred: pred[i]});
      return {'x': xs[i], 'y': ys[i], pred: pred[i]};
    });
    return values
  }

}
