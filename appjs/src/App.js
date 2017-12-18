import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: 0,
      data: [
        {name: 'point1', value: [0.3,5 ]},
        {name: 'point2', value: [1.5,8 ]},
      ],
    };
  }

  // _getAbs(arr) {
  //   return arr.map(elem => Math.abs(elem));
  // }


// Copias de los estados por recomendación del concepto de inmutabilidad
// Lo que hace processpoints es guarda los 2 valores de los 2 inputs
  proccessPoints() {
    const point1Val = document.getElementById('point1').value.split(' ');
    const point2Val = document.getElementById('point2').value.split(' ');
//Luego inicializa el estado en a 0, luego en el callback obtiene la distancia de los puntos)
    this.setState({
      result: 0,
    }, () => {
      this.getDistance(point1Val, point2Val, 0); //obtiene el punto 1, 2 y el indice x,y)
      this.getDistance(point1Val, point2Val, 1);
    });
  }


// Get distance recibe 3 paramotres, los 2 puntos y recibe un tercero para poder trabajar en cualquier plano
  getDistance(input1, input2, index) {
    const point1 = parseFloat(input1[index]); //Las copias de los points que estan en el estado
    const point2 = parseFloat(input2[index]);

// Obtener el maximo de cada punto, 
    let maxPoint1 = Math.ceil(point1);
    let maxPoint2 = Math.ceil(point2);
// Obtener el minimo de cada punto
    let minPoint1 = Math.floor(point1);
    let minPoint2 = Math.floor(point2);
//Es necesario saber esto para poder saber que camino mas corto tomar de los 2 posibles

    let result1 = 0,
        result2 = 0,
        result = 0,
        diff = 0;


//Validaciones si los cuadrados son consecutivos, para saber si son concecutivos o alejados
    if (maxPoint1 - maxPoint2 > 1) {
      diff = maxPoint1 - maxPoint2 - 1;
      maxPoint1 -= diff;
      minPoint1 -= diff;
    } else if (maxPoint2 - maxPoint1 > 1) {
      diff = maxPoint2 - maxPoint1 - 1;
      maxPoint2 -= diff;
      minPoint2 -= diff;
    }
// Estos 2 sirven para ver si estan en el mismo cuadrado
    if (maxPoint1 === maxPoint2) {
      const diff1 = Math.abs(maxPoint1 - point1);
      const diff2 = Math.abs(maxPoint2 - point2);
      result1 = diff1 + diff2;
    }

    if (minPoint1 === minPoint2) {
      const diff1 = Math.abs(minPoint1 - point1);
      const diff2 = Math.abs(minPoint2 - point2);
      result2 = diff1 + diff2;
    }
// Si los puntos estan en cuadrados consecutivos
    if (maxPoint1 === minPoint2) {
      const diff1 = Math.abs(maxPoint1 - point1);
      const diff2 = Math.abs(minPoint2 - point2);
      result1 = diff1 + diff2;
      result2 = diff1 + diff2;
    }

    if (minPoint1 === maxPoint2) {
      const diff1 = Math.abs(minPoint1 - point1);
      const diff2 = Math.abs(maxPoint2 - point2);
      result1 = diff1 + diff2;
      result2 = diff1 + diff2;
    }
//Sirve para ver si los puntos estan en algun vertice del cuadrado
    if (Math.ceil(point1) === point1 && Math.ceil(point2) === point2) {
      result1 = Math.abs(point1 - point2);
      result2 = Math.abs(point1 - point2);
    }
// Triada de resultado
    result = result1 >= result2 ? result2 : result1;

    this.setState({
      result: this.state.result += result,
    });
  }

  render() {
    return (
      <div className="container">

          <div className="form-group">
            <div className="form-group">
              <label htmlFor="point1">
                Point 1
                <input type="text" className="form-control" id="point1" name="point1" />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="point2">
                Point 2
                <input type="text" className="form-control" id="point2" name="point2" />
              </label>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={() => this.proccessPoints()}>Get result</button>
            </div>
            <div className="alert alert-primary">
              {this.state.result.toFixed(2)}
            </div>
          </div>
      	<LineChart
          width={600}
          height={300}
          data={this.state.data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
      </div>
    );
  }
}

export default App;
