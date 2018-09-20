import React from 'react';

export class OrderSelect extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
          orderSelectd:""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        let value = e.target.value;
        switch(value) {
            case "price":
                this.orderPrice();
                break;
            case "name":
                this.orderName();
                break;
            case "date":
                this.orderDate();
                break;
            default:
        }
    }

    orderPrice(){
        let allProducts = this.props.rawData;
        
        allProducts.sort(function (a, b) {
            if (parseInt(a.price) > parseInt(b.price)) {
              return 1;
            }
            if (parseInt(a.price) < parseInt(b.price)) {
              return -1;
            }
            return 0;
        });
        this.props.paintProds(allProducts);
    }

    orderName(){
        let allProducts = this.props.rawData;
        
        allProducts.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            return 0;
        });
        this.props.paintProds(allProducts);
    }

    orderDate(){
        let allProducts = this.props.rawData;
        
        allProducts.sort(function (a, b) {
            if (a.created > b.created) {
              return 1;
            }
            if (a.created < b.created) {
              return -1;
            }
            return 0;
        });
        this.props.paintProds(allProducts);
    }

    render(){
        return(
            <div id="order-prods">
                <select onChange={this.handleChange}>
                <option >Ordenar por...</option>
                <option value="price">Precio</option>
                <option value="name">Nombre</option>
                <option value="date">Fecha</option>
                </select>
            </div>
        );
    }
}
