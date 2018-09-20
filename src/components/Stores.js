import React from 'react';

export class Stores extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
          stores:[]
        };
        this.getStores = this.getStores.bind(this);
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

    render(){
        return(
            <div id="stores">
                Tiendas
                {this.state.stores}
            </div>
        );
    }
}
