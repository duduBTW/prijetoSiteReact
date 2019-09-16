import React, { Component } from 'react';
import {  ProgressBar } from 'react-materialize';
import './css/styleProduto.css'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import * as Cookies from 'es-cookie';

var jwt = require('jsonwebtoken');

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
    addCarrinho = () =>{
        // Meu deus esse codigo está caotico... what have I done
        const produto = Cookies.get('produto')
        if(!produto){
            this.state.produto.quantidade = 1
            const produtoBase = [this.state.produto];
            const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
            Cookies.set('produto', produto);
            this.props.history.push('/carrinho');
        } else {
            const produtoInicio = this.state.produto;
            const produtoo = Cookies.get('produto')
            var decoded = jwt.verify(produtoo, 'HifumiBestWaifu');

            const produtoIgual = decoded.produtoBase.find(item => item.titulo === produtoInicio.titulo)
            if(produtoIgual){
                let produtoBase = decoded.produtoBase.filter(item => item.titulo !== produtoIgual.titulo)
                produtoIgual.quantidade = ++produtoIgual.quantidade
                produtoBase = [...produtoBase, produtoIgual]

                const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
                Cookies.set('produto', produto);
                this.props.history.push('/carrinho');
            } else {
                produtoInicio.quantidade = 1
                const produtoBase = [...decoded.produtoBase, produtoInicio]
                const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
                Cookies.set('produto', produto);
                this.props.history.push('/carrinho');
            }
        }
    }
    render(){
        return(
            <div> 
                {this.state.produto !== null ? (
                    <div className="produto">
                        <div className="img center" onLoad={() => {
                            var elems = document.querySelectorAll('.materialboxed');
                            var instances = M.Materialbox.init(elems);
                        }}>
                            <img data-caption={this.state.produto.titulo} className="materialboxed" style={{width: 518}} src={this.state.produto.image}/>
                        </div>
                        <div className="infos">
                            <h3>{this.state.produto !== null ? this.state.produto.titulo : <div>Carregando...</div> }</h3>
                            <h4>{this.state.produto !== null ? <div><span className="grey-text">Preço:</span> <span className="green-text">R$:{this.state.produto.preco}</span></div> : null}</h4>
                        </div>
                        <div className="comprar">
                            <button className="btn black waves-effect waves-green">Comprar Agora</button>
                            <button onClick={this.addCarrinho} className="btn black waves-effect waves-green">Adicionar ao carrinho</button>
                        </div>
                        {  
                        }
                    </div>
                ) : (
                    <ProgressBar/>
                ) }
            </div>
        )
    }
}

export default Produto