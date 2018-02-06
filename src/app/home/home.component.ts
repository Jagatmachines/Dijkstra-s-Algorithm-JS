import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numberOfNodes: number = 0;
  nodeNumber: number = 0;
  INF = 9999;
  /* graphItem = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]; */
  graphItem = [[]];
  statingPoint = 0;
  finalOutput = [];
  ArrayNumber = [];
  startingPoint = 0;

  step2 = false;
  step3 = false;

  constructor() {}

  ngOnInit() {
  }

  addItem() {
    this.numberOfNodes = +this.nodeNumber;

    for (let i = 0; i < this.numberOfNodes; i++) {
      this.ArrayNumber.push(i);
    }

    this.graphItem = new Array(this.numberOfNodes).fill(0);
    for (let j = 0; j < this.numberOfNodes; j++) {
      this.graphItem[j] = new Array(this.numberOfNodes).fill(0);
    }
    this.step2 = true;
  }

  minDistance = (dist: any, sptSet: any) => {
    let min = this.INF;
    let min_index = -1;
    for (let v = 0; v < this.numberOfNodes; v++) {
      if (sptSet[v] === false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }

    return min_index;
  }

  printSolution = (dist: any, n: number) => {
    for (let i = 0; i < this.numberOfNodes; i++) {
      this.finalOutput.push(`${i} - ${dist[i]}`);
    }
  }

  dijkstra = (graph: any, src: number) => {
    let dist = new Array(this.numberOfNodes);
    let sptSet = new Array(this.numberOfNodes);

    for (let i = 0; i < this.numberOfNodes; i++) {
      dist[i] = this.INF;
      sptSet[i] = false;
    }

    dist[src] = 0;

    for (let count = 0; count < this.numberOfNodes - 1; count++) {
      let u = this.minDistance(dist, sptSet);
      sptSet[u] = true;

      for (let v = 0; v < this.numberOfNodes; v++) {
        if (!sptSet[v] && graph[u][v] && dist[u] !== this.INF && ((dist[u] + graph[u][v]) < dist[v])) {
          dist[v] = dist[u] + graph[u][v];
        }
      }
    }

    this.printSolution(dist, this.numberOfNodes);
  }

  generate = () => {
    /* const graph = [
      [0, 4, 0, 0, 0, 0, 0, 8, 0],
      [4, 0, 8, 0, 0, 0, 0, 11, 0],
      [0, 8, 0, 7, 0, 4, 0, 0, 2],
      [0, 0, 7, 0, 9, 14, 0, 0, 0],
      [0, 0, 0, 9, 0, 10, 0, 0, 0],
      [0, 0, 4, 14, 10, 0, 2, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 1, 6],
      [8, 11, 0, 0, 0, 0, 1, 0, 7],
      [0, 0, 2, 0, 0, 0, 6, 7, 0]
    ]; */

    this.dijkstra(this.graphItem, this.statingPoint);

    this.step2 = false;
    this.step3 = true;
  }

}


