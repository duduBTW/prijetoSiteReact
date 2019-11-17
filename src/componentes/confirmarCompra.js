import React, { Component } from 'react'
import { CarrinhoContext } from './context/CarrinhoContext';
import { UsuarioContext } from './context/UsuarioContext';
import './css/styleConfirmarCompra.css'
import axios from 'axios';

class ConfirmarCompra extends Component {
    teste = (itensCarrinho) => {
        axios.post('http://localhost:3001/api/putCompra', {
            itensCarrinho
        })
    }

    render() {
        return (
            <UsuarioContext.Consumer>{usuario => {
                return (
                    <CarrinhoContext.Consumer>{itens => {
                        const { itensCarrinho, precoTotal, itemTotal } = itens
                        const { cartao } = usuario
                        return (
                            <div className="conteinerConfirmarCompra" style={{ width: "auto", padding: "4vw" }}>
                                <table className="striped card">
                                    <thead>
                                        <h4>Sua compra</h4>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantidade</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {itensCarrinho ?
                                            (
                                                itensCarrinho.map(item => (
                                                    <tr>
                                                        <td> {item.titulo} </td>
                                                        <td> {item.quantidade} </td>
                                                        <td> R$:{item.preco} </td>
                                                    </tr>
                                                ))
                                            )

                                            :
                                            null
                                        }

                                        <tr>
                                            <td> <b>Total</b> </td>
                                            <td> {itemTotal} </td>
                                            <td> R$:{precoTotal} </td>
                                        </tr>

                                    </tbody>
                                </table>

                                <div className="metodoPagamento">

                                    {(cartao !== null && cartao !== undefined) ?
                                        <ul class="collection with-header">
                                            <li class="collection-header"><h5>Escolha um cartão</h5></li>
                                            <a href="#!" class="collection-item " onClick={() => this.teste(itensCarrinho)}>
                                                {cartao.nome} - {cartao.numero.substring(0, cartao.numero.length - (cartao.numero.length - 4))}
                                                <i class="material-icons secondary-content">send</i>
                                            </a>
                                        </ul>
                                        :
                                        null
                                    }

                                    <ul class="collection with-header">
                                        <li class="collection-header"><h5>{(cartao !== null && cartao !== undefined) ? <span>Outros </span> : null}Metodo de pagamento</h5></li>
                                        <a href="#!" class="collection-item ">Adicionar cartão<i class="material-icons secondary-content">send</i></a>
                                        <a href="#!" class="collection-item">Boleto<i class="material-icons secondary-content">send</i></a>
                                    </ul>
                                </div>

                            </div>
                        )
                    }}
                    </CarrinhoContext.Consumer>
                )
            }}
            </UsuarioContext.Consumer>

        )
    }
}

export default ConfirmarCompra
