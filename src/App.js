import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      rawData:[],
      stores:[]
    };
    this.getData = this.getData.bind(this);
    this.getStores = this.getStores.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.getStores();
  }

  getData(){
    var xhr = new XMLHttpRequest();
    var json_obj, status = false;
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://canastarosa.com/services/api/v1/market/products/?category__slug=infantil&page_size=200&page=1", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          status = true;
          this.setState({rawData:json_obj.results});
          //this.getStores();
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

  getStores(){
    //let allProducts = this.state.rawData;
    let allProducts= data.results;
    //get all the names of the stores
    let allStores = allProducts.map(function(x) {
        return x.store.name;
    });

    //get unique names of stores
    const unique = (value, index, self) => {
        //returns the first index at which a given element can be found in the array
        return self.indexOf(value) === index;
    }
    const uniqueStores = allStores.filter(unique).sort();
    this.countStores(uniqueStores, allStores);
  }

  countStores(uniqueStores, allStores){
    let stores = uniqueStores.map(function(unique) {
      let count=0;
        allStores.forEach(function(element) {
          if(unique===element){
            count++
          }
        });
      //create template of store
      let store=(
        <div>
          <p>{unique}<span> ({count})</span></p>
        </div>
      );
      return store;
    });
    //paint store
    this.setState({stores:stores})
  }

  search(e){
    e.preventDefault();
    console.log("hello")
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
            {this.state.stores}
          </div>
          <div id="sub-nav">
            <div>Productos</div>
            <div>
            <form onSubmit={this.search}>
              <input type="text" name="search" placeholder="¿Qué estás buscando?"/>
              <input type="submit"/>
            </form>
            </div>
            <div>Ordenar por</div>
            <section id="results"></section>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
