import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prediction';
  model: any;
  numberOfTimersPregnet = 6;
  plasmaGlucoseConcentration = 148;
  diastolicBloodPressure = 72;
  tricepsSkinFoldThickness = 35;
  serumInsulin = 0;
  bodyMassIndex = 33.6;
  diabetesPedigreeFunction = 0.627;
  age = 50

  prediction = "No";

  constructor() { }

  async ngOnInit() {
    this.model = await tf.loadLayersModel('../assets/tensorflow_serve/tfjs_files/1/model.json');
  }

  onSubmit() {
    let data = [
      [
        this.numberOfTimersPregnet,
        this.plasmaGlucoseConcentration,
        this.diastolicBloodPressure,
        this.tricepsSkinFoldThickness,
        this.serumInsulin,
        this.bodyMassIndex,
        this.diabetesPedigreeFunction,
        this.age
      ]
    ];
    let p = this.model.predict(tf.tensor2d(data, [1, 8])).dataSync();
    if(p[0] > 0.5) {
      this.prediction = "Yes";
    }else if (p[0] <= 0.5 && p[0] > 0.2) {
        this.prediction = "Danger";
    }else {
      this.prediction = "No";
    }
  }

}
