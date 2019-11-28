import React, { Component } from 'react'
import { CarrinhoContext } from './context/CarrinhoContext';
import { UsuarioContext } from './context/UsuarioContext';
import './css/styleConfirmarCompra.css'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class ConfirmarCompra extends Component {

    state = {
        checkedCartao: false,
        checkedEndreco: false
    }

    teste = (itensCarrinho, email) => {
        Swal.fire({
            title: 'Deseja finalizar a compra?',
            text: "Você não poderá voltar atras depois disso!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, comprar!'
        }).then((result) => {
            if (result.value) {
                axios.post('http://localhost:3001/api/putCompra', {
                    itensCarrinho,
                    email
                })
                    .then((res) => {
                        const { success } = res.data;


                        if (success) {
                            Swal.fire({
                                type: 'success',
                                title: 'Compra realizada com sucesso'
                            })
                                .then((result) => {
                                    if (result) {
                                        this.props.history.push('/compras');
                                    }
                                })
                        }
                    });
            }
        })

    }

    comprarBoleto = (precoTotal, nomeUsuario, itensCarrinho, email) => {
        if (this.state.checkedEndreco === true) {
            Swal.fire({
                title: 'Deseja finalizar a compra com o boleto?',
                text: "Você não poderá voltar atras depois disso!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, comprar!'
            }).then((result) => {
                if (result.value) {
                    axios.post('http://localhost:3001/api/gerarBoleto', {
                        nome: nomeUsuario,
                        titulo: `Produtos Happy Hardware`,
                        preco: precoTotal,
                    }).then(res => {
                        window.open(`http://localhost:3001/${res.data.path}.pdf`, '_blank')

                        const { success } = res.data;
                        if (success) {
                            axios.post('http://localhost:3001/api/putCompra', {
                                itensCarrinho,
                                email
                            })
                                .then(
                                    Swal.fire({
                                        type: 'success',
                                        title: 'Compra realizada com sucesso'
                                    })
                                        .then((result) => {
                                            if (result) {
                                                this.props.history.push('/compras');
                                            }
                                        })
                                )
                        }
                    })
                }
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Selecione um endereço!',
            })
        }

    }

    render() {
        return (
            <UsuarioContext.Consumer>{usuario => {
                return (
                    <CarrinhoContext.Consumer>{itens => {
                        const { itensCarrinho, precoTotal, itemTotal } = itens
                        const { cartao, email, endereco, nome } = usuario
                        const { checkedCartao, checkedEndreco } = this.state
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
                                    <div style={{ display: "flex", padding: 20, width: "170%", alignItems: "center", justifyContent: "center" }} >
                                        <button onClick={() => this.teste(itensCarrinho, email)} className={(checkedCartao === true && checkedEndreco) === true ? "btn-large black" : "btn-large black disabled"}>Finalizar Compra</button>

                                    </div>
                                </table>

                                <div className="metodoPagamento">

                                    {(cartao !== null && cartao !== undefined && cartao.cvc !== null) ?
                                        <ul class="collection with-header">
                                            <li class="collection-header"><h5>Escolha um cartão</h5></li>
                                            <a href="#!" class="collection-item " >
                                                <label>
                                                    <input type="checkbox" />
                                                    <span onClick={() => this.setState({ checkedCartao: !this.state.checkedCartao })}>{cartao.nome} - **** **** **** {cartao.numero.substring(0, cartao.numero.length - (cartao.numero.length - 4))}</span>
                                                </label>
                                            </a>
                                        </ul>
                                        :
                                        null
                                    }


                                    <ul class="collection with-header">
                                        <li class="collection-header"><h5>Escolha um endereço para o envio</h5></li>
                                        {(endereco !== null && endereco !== undefined) ?
                                            <a href="#!" class="collection-item " >
                                                <label>
                                                    <input type="checkbox" />
                                                    <span className="black-text" onClick={() => this.setState({ checkedEndreco: !this.state.checkedEndreco })}>
                                                        {endereco.endereco}, {endereco.numero} <br />
                                                        {endereco.bairro} <br />
                                                        {endereco.cidade} - {endereco.estado} <br />
                                                        CEP - {endereco.cep}
                                                    </span>
                                                </label>

                                            </a>
                                            :
                                            <Link to="/perfil" class="collection-item ">Adicionar endereço<i class="material-icons secondary-content">send</i></Link>
                                        }
                                    </ul>


                                    <ul class="collection with-header">
                                        <li class="collection-header"><h5>{(cartao !== null && cartao !== undefined) ? <span>Outros </span> : null}Metodo de pagamento</h5></li>
                                        <Link to="/card" class="collection-item ">Adicionar cartão<i class="material-icons secondary-content">send</i></Link>
                                        <a href="#!" onClick={() => this.comprarBoleto(precoTotal, nome, itensCarrinho, email)} class="collection-item">Boleto<i class="material-icons secondary-content">send</i></a>
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
