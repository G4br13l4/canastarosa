import React from 'react';
import {Store} from './Store';

export class Stores extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
          stores:[]
        };
        this.getStores = this.getStores.bind(this);
        this.getAllProds = this.getAllProds.bind(this);
    }

    getStores(){
        let allProducts = this.props.rawData;
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
          
          return (
            <Store
              name={unique}
              counter={count}
              rawData={this.props.rawData}
              paintProds={this.props.paintProds}
            />
          );
        }.bind(this));
        //paint store
        this.setState({stores:stores})
    }

    getAllProds(){
        this.props.paintProds(this.props.rawData);
    }

    render(){
        return(
            <div id="stores">
                <p>Tiendas</p>
                <p onClick={this.getAllProds}>Todas ({this.props.rawData.length})</p>
                {this.state.stores}
            </div>
        );
    }
}
