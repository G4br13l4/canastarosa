import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      rawData:[],
      products:""
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(){
    var xhr = new XMLHttpRequest();
    var json_obj, status = false;
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://canastarosa.com/api/v1/market/products/?page_size=20&page=1", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          status = true;
          console.log(json_obj)
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }

  render() {
    return (
      <div>
        <header>
          <img></img>
        </header>
        <nav>
          <div id="title-nav">
            MARKET | INSPIRE
          </div>
          <div id="nav-sections">
            <div>Delicios</div>
            <div>Fiestas</div>
            <div>Diseño</div>
            <div>Infantil</div>
            <div>Saludable</div>
            <div>Accesorios</div>
            <div>Rosh Hashana</div>
            <div>Back to School</div>
            <div>Otros</div>
          </div>
        </nav>
        <div id="category-cover">
          <p>Delicioso</p>
        </div>
        <section>
          <div id="stores">
            Tiendas
          </div>
          <div id="products">
            Productos
            {this.state.products}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
