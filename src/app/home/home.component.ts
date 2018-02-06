import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numberOfNodes = 0;
  nodeNumber: string;
  nV = 9;
  INF = 9999;
  graphItem = [];

  constructor() {}

  ngOnInit() {
  }

  addItem() {
    this.numberOfNodes = +this.nodeNumber;
  }

  createRange(number) {
    let items = [];
    for (let i = 1; i <= number; i++) {
       items.push(i);
    }
    return items;
  }






  minDistance = (dist: any, sptSet: any) => {
    let min = this.INF;
    let min_index = -1;
    for (let v = 0; v < this.nV; v++) {
      if (sptSet[v] === false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }
    }

    return min_index;
  }

  printSolution = (dist: any, n: number) => {
    console.log('Vertex Distance from source \n');
    for (let i = 0; i < this.nV; i++) {
      console.log(i, ' tt ', dist[i], '\n');
    }
  }

  dijkstra = (graph: any, src: number) => {
    let dist = new Array(this.nV);
    let sptSet = new Array(this.nV);

    for (let i = 0; i < this.nV; i++) {
      dist[i] = this.INF;
      sptSet[i] = false;
    }

    dist[src] = 0;

    for (let count = 0; count < this.nV - 1; count++) {
      let u = this.minDistance(dist, sptSet);
      // console.log('\nitem', u);
      // debugger;

      sptSet[u] = true;

      for (let v = 0; v < this.nV; v++) {
        if (!sptSet[v] && graph[u][v] && dist[u] !== this.INF && ((dist[u] + graph[u][v]) < dist[v])) {
          // console.log('erorr', dist[v]);
          dist[v] = dist[u] + graph[u][v];
          // console.log('data', dist[v]);
        }
      }
    }

    this.printSolution(dist, this.nV);
  }

  generate = () => {
    const graph = [
      [0, 4, 0, 0, 0, 0, 0, 8, 0],
      [4, 0, 8, 0, 0, 0, 0, 11, 0],
      [0, 8, 0, 7, 0, 4, 0, 0, 2],
      [0, 0, 7, 0, 9, 14, 0, 0, 0],
      [0, 0, 0, 9, 0, 10, 0, 0, 0],
      [0, 0, 4, 14, 10, 0, 2, 0, 0],
      [0, 0, 0, 0, 0, 2, 0, 1, 6],
      [8, 11, 0, 0, 0, 0, 1, 0, 7],
      [0, 0, 2, 0, 0, 0, 6, 7, 0]
    ];

    this.dijkstra(graph, 0);
  }
}


