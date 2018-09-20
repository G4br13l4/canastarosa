import React from 'react';

export class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
          searchVal:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleChange(e){
        let value = e.target.value;
        this.setState({searchVal: value});
    }
  
    handleSubmit(e){
      e.preventDefault();
      let allProducts =this.props.rawData;
      let keyword =this.state.searchVal.toLowerCase();
      
      let results = allProducts.filter(
        prod => prod.name.toLowerCase().indexOf(keyword) > -1
      );
      this.props.paintProds(results);
      this.resetForm();
    }

    resetForm(){
       this.setState({searchVal: ""});
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    value={this.state.searchVal} 
                    onChange={this.handleChange} 
                    type="text" name="search" 
                    placeholder="¿Qué estás buscando?"
                />
                <input type="submit"/>
            </form>
        );
    }
}
