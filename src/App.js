import React, { Component } from 'react';
import {Stores} from './components/Stores';
import {SearchBar} from './components/SearchBar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      rawData:[],
      products:[]
    };
    this.getData = this.getData.bind(this);

    this.stores = React.createRef();

    this.paintProds = this.paintProds.bind(this);
  }

  componentDidMount() {
    this.getData();
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
          this.refs.stores.getStores();
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

  paintProds(prods){
    let showProds = prods.map(function(prod) {
      let template=(
        <div className="prod-card">
          <div className="img-box">
            <img src={prod.photo.small}/>
          </div>
          <p>{prod.name[0].toUpperCase()+ prod.name.slice(1)}</p>
          <p>{prod.store.name}</p>
          <p>${prod.price}</p>
        </div>
      );
      return template;
    });
    this.setState({products:showProds})
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
          <Stores ref="stores" rawData={this.state.rawData}/>
          <div id="sub-nav">
            <div id="title-count">Productos</div>
            <SearchBar 
              rawData={this.state.rawData}
              paintProds={this.paintProds}
            />
            <div id="order-prods">Ordenar por</div>
            <section id="results">
              {this.state.products}
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
