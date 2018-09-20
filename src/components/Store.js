import React from 'react';

export class Store extends React.Component{
    constructor(props) {
        super(props);
        this.state= {

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let storeName = this.props.name;
        let allProducts = this.props.rawData;

        let results = allProducts.filter(
            prod => prod.store.name == storeName
        );
        
        this.props.paintProds(results);
    }

    render(){
        return(
            <div onClick={this.handleClick}>
              <p>{this.props.name}<span>({this.props.counter})</span></p>
            </div>
        );
    }
}
