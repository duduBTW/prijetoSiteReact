import React, { Component } from 'react';
import {  ProgressBar } from 'react-materialize';

class Produto extends Component{
    state = {
        produto: null,
        titulo: null,
        
    }
    componentWillReceiveProps(props){
        const a = props.match.params.datTitulo.replace(/_/g, " ")
        const produto = props.data.find(dat => dat.titulo === a)
        if(produto !== null && produto !== undefined){
            this.setState({produto})
            this.setState({titulo: produto.titulo})
        }
    }
    componentDidMount(){
        // if(this.state.produto === null){
        //     const a = this.props.match.params.datTitulo
        //     this.setState({produto: this.props.data.find(dat => dat.titulo === a)})
        // }
        if(this.props.data !== []){
            const a = this.props.match.params.datTitulo.replace(/_/g, " ")
            const produto = this.props.data.find(dat => dat.titulo === a)
            if(produto !== null && produto !== undefined){
                this.setState({produto})
                this.setState({titulo: produto.titulo})
            }
        }
        
    }
    render(){
        return(
            <div className="center">
                {this.state.produto !== null ? (
                    <div>
                        <h3>{this.state.produto !== null ? this.state.produto.titulo : <div>Carregando...</div> }</h3>
                        <img src={this.state.produto.image}/>
                        <h3>{this.state.produto !== null ? this.state.produto.preco : null}</h3>
                    </div>
                ) : (
                    <ProgressBar/>
                ) }
            </div>
        )
    }
}

export default Produto