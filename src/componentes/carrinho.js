import React, { Component } from 'react';
import './css/styleCarrinho.css'
import * as Cookies from 'es-cookie';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

var jwt = require('jsonwebtoken');

class Carrinho extends Component {
    state = {
        itensCarrinho: null,
        precoTotal: 0,
        itemTotal: 0,
        itemRemovido: null
    }
    componentDidMount = () =>{
        window.scrollTo(0, 0);
        const produto = Cookies.get('produto')
        if(produto){
            const produtoo = Cookies.get('produto')
            var decodedProduto = jwt.verify(produtoo, 'HifumiBestWaifu');
            this.setState({itensCarrinho: decodedProduto.produtoBase})
            decodedProduto.produtoBase.forEach(element => {
                this.setState({
                    precoTotal: this.state.precoTotal += (element.preco * element.quantidade)
                })
            });
            let itemTotal = 0
            decodedProduto.produtoBase.forEach(item => itemTotal = itemTotal + item.quantidade)
            this.setState({itemTotal})
        } 
    }
    
    removerItem = (itemRemover) => {
        const produtoBase = this.state.itensCarrinho.filter(item => item.titulo !== itemRemover)
        this.setState({itensCarrinho: produtoBase})
        const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
        Cookies.set('produto', produto);

        const itemParaRemover = this.state.itensCarrinho.find(item => item.titulo === itemRemover);
        this.setState({
            precoTotal: this.state.precoTotal - (itemParaRemover.preco * itemParaRemover.quantidade),
            itemTotal: this.state.itemTotal - itemParaRemover.quantidade,
            itemRemovido: itemParaRemover
        })
    }

    mudarQuantidade =(addOrRem, titulo, preco)=>{
        const produtoInicio = this.state.itensCarrinho.find(produto => produto.titulo === titulo)
        let produtoBase = this.state.itensCarrinho.filter(produto => produto.titulo !== titulo)
    
        if (addOrRem === 'adicionar'){
            produtoInicio.quantidade = ++produtoInicio.quantidade
            this.setState({
                precoTotal: this.state.precoTotal + preco,
                itemTotal: ++this.state.itemTotal
            })
        } else if (addOrRem === 'remover'){
            produtoInicio.quantidade = --produtoInicio.quantidade
            this.setState({
                precoTotal: this.state.precoTotal - preco,
                itemTotal: --this.state.itemTotal
            })
        }
        produtoBase = [produtoInicio, ...produtoBase]

        const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
        Cookies.set('produto', produto);
    }

    desfazer = () =>{
        const {itemRemovido, itensCarrinho} = this.state
        const produtoBase = [...itensCarrinho, itemRemovido]
        this.setState({itensCarrinho: produtoBase})
        const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
        Cookies.set('produto', produto);

        this.setState({
            precoTotal: this.state.precoTotal + (itemRemovido.preco * itemRemovido.quantidade),
            itemTotal: this.state.itemTotal + itemRemovido.quantidade,
            itemRemovido: null
        })
    }

    render(){
        const { itensCarrinho, precoTotal, itemTotal, itemRemovido } = this.state
        return(
           <div>
                {itensCarrinho !== null && itensCarrinho.length > 0 ? (
                    <div className="conteinerTudo">
                        <div className="itensCar">

                        {itemRemovido !== null ? 
                            <ul 
                                style={{maxWidth: 690}}
                                className="collapsible" 
                                onClick={() => {
                                    var elems = document.querySelectorAll('.collapsible');
                                    M.Collapsible.init(elems);
                                }}
                            >
                                <li className="active">
                                <div className="collapsible-header red-text">
                                    <i className="material-icons">delete</i>
                                    <div>
                                    {itemRemovido.titulo} removido do carrinho
                                    </div>
                                </div>
                                    <div className="collapsible-body">
                                        <div style={{display: 'flex',flexDirection: "column", alignItems: "center"}}>
                                            <button 
                                            style={{marginBottom: 10}} 
                                            className="btn waves-effect waves-light black"
                                            onClick={this.desfazer}
                                            >Desfazer</button>
                                            
                                            <button 
                                            className="btn waves-effect waves-light black"
                                            onClick={
                                                () => this.setState({itemRemovido: null})
                                            }
                                            >Deletar aba</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                         : null}

                            <h5>Meu carrinho</h5>
                            {itensCarrinho.map(item => (
                                <div className="img" data-aos-duration="340" data-aos="fade-right" data-aos-easing="ease-out-cubic" className="itemCar" key={item.titulo}>
                                    <img data-caption={item.titulo} className="materialboxed" src={item.image} onLoad={() => {
                                        var elems = document.querySelectorAll('.materialboxed');
                                        M.Materialbox.init(elems);
                                    }}/>
                                    <div className="itensInfo">
                                        <Link 
                                        className="black-text" 
                                        to={`/produto/${item.titulo.replace(/ /g, "_")}`}>
                                            <h6>{item.titulo}</h6>
                                        </Link>
                                        <h5>R$:{item.preco}</h5>
                                        <div style={{paddingTop: 10}}>
                                        <span style={{marginRight: 7}} className="grey-text">Quantidade: </span> <br/>
                                            <div style={{display: 'flex', paddingTop: 10}}>
                                                <button 
                                                className="btn-floating btn-small waves-effect waves-light black"                                          
                                                onClick={()=> {
                                                    if(item.quantidade > 1){
                                                        this.mudarQuantidade('remover', item.titulo, item.preco)
                                                    }
                                                }}
                                                ><i className="material-icons">remove</i></button>

                                                    <span className="itemQnt">{item.quantidade}</span>
                                                    
                                                <button 
                                                className="btn-floating btn-small waves-effect waves-light black" 
                                                onClick={()=>  {
                                                    if(item.quantidade < 50){
                                                        this.mudarQuantidade('adicionar', item.titulo, item.preco)
                                                    } else {
                                                        Swal.fire({
                                                        imageUrl: 'https://66.media.tumblr.com/1713c9cd9ae91bda8e566cb2d7b3734f/tumblr_pgurymeCoc1tx45yjo1_400.gif',
                                                        imageAlt: 'Angry',
                                                        title: 'Stop trying to break the store!',
                                                        text: '50 itens são o bastante',
                                                        })
                                                    }
                                                }}
                                                ><i className="material-icons">add</i></button>                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="remover">
                                        <div 
                                        style={{cursor: 'pointer'}} 
                                        onClick={() => this.removerItem(item.titulo)}
                                        >
                                            <i className="material-icons">remove_shopping_cart</i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div  className="resumoCar">
                            <h5>Resumo da compra</h5>
                            <div className="infos img" data-aos-duration="300" data-aos="fade-left" data-aos-easing="ease-out-cubic">
                                <div className="infosPrecos black-text">
                                    <h5>Total 
                                        <span style={{fontSize: 22}}>
                                            ({itemTotal} {itemTotal > 1 ? <span>itens</span> : <span>item</span> }): 
                                        </span>
                                        <span className="green-text">
                                         R${precoTotal}
                                        </span>
                                    </h5>
                                </div>
                                <div className="botoes">
                                    <Link 
                                    to="/" 
                                    className="btn-large white black-text waves-effect waves-light"
                                    >Escolher mais produtos
                                    </Link>
                                    
                                    <button 
                                    className="btn-large black waves-effect waves-light"
                                    onClick={() => {
                                        var token = Cookies.get('token')
                                        if (!token){
                                            this.props.history.push('/entrar');
                                        }
                                    }}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
                        <i className="large material-icons">shopping_basket</i>
                        <h5>Seu carrinho está vazio</h5>
                        <h6 className="grey-text">Adicione produtos clicando no botão “Adicionar ao carrinho” na página de produto.</h6>
                        <Link to="/" style={{marginTop: 20}} className="btn-large white black-text waves-effect waves-light">Voltar a tela inicial</Link>
                    </div>
                )}
           </div>
        )
    }
}

export default Carrinho