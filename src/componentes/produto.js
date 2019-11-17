import React, { Component } from 'react';
import { ProgressBar } from 'react-materialize';
import { CarrinhoContext } from './context/CarrinhoContext'
import './css/styleProduto.css'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import axios from 'axios';
import * as Cookies from 'es-cookie';

import Item from './partes/Item'

var jwt = require('jsonwebtoken');

class Produto extends Component {
    state = {
        produto: null,
        titulo: null,
        produtoNovo: null,
        tituloNovo: null,
        itensHistorico: null,
        nome: null,
        email: null,
        editar: false
    }
    componentWillReceiveProps(props) {
        window.scrollTo(0, 0);
        const a = props.match.params.datTitulo.replace(/_/g, " ")
        const produto = props.data.find(dat => dat.titulo === a)
        if (produto !== null && produto !== undefined) {
            this.setState({ produto })
            this.setState({ titulo: produto.titulo })
        }
        if (produto !== undefined) {
            this.addHistorico(produto)
        }
    }
    componentDidMount = () => {
        window.scrollTo(0, 0);
        if (this.props.data.length !== 0) {
            const a = this.props.match.params.datTitulo.replace(/_/g, " ")
            const produto = this.props.data.find(dat => dat.titulo === a)
            if (produto !== null && produto !== undefined) {
                this.setState({ produto })
                this.setState({ titulo: produto.titulo })
            }
            if (produto !== undefined) {
                this.addHistorico(produto)
            }
        }

        // var token = Cookies.get('token')
        // if (token) {
        //     var decoded = jwt.verify(token, 'HifumiBestWaifu');
        //     const { email, nome } = decoded.user
        //     this.setState({
        //         email,
        //         nome
        //     })
        // }
    }

    addHistorico = (produto) => {
        // Descobrir se existem Cookies
        let historico = Cookies.get('historico')
        if (!historico) {
            // Se o historico estiver vazio cria um array com o item
            const historicoBase = [produto];
            const historico = jwt.sign({ historicoBase }, 'HifumiBestWaifu');
            Cookies.set('historico', historico);
        } else {
            // Se o historico estiver vazio cria verifica se o item já existe
            var decoded = jwt.verify(historico, 'HifumiBestWaifu');
            this.setState({ itensHistorico: decoded })
            const historicoIgual = decoded.historicoBase.find(item => item.titulo === produto.titulo)

            if (!historicoIgual) {
                if (decoded.historicoBase.length >= 6) {
                    decoded.historicoBase.splice(0, 1)
                }
                // Se não existir adiciona no cookie
                const historicoBase = [...decoded.historicoBase, produto];
                const historico = jwt.sign({ historicoBase }, 'HifumiBestWaifu');

                Cookies.set('historico', historico);
            }
        }
    }

    // comprarBoleto = () => {
    //     axios.post('http://localhost:3001/api/gerarBoleto', {
    //         nome: `${this.state.nome}`,
    //         titulo: `${this.state.produto.titulo.replace(/ /g, "_")}`,
    //         preco: this.state.produto.preco,
    //     }).then(res => {
    //         console.log(res)
    //         window.open(`http://localhost:3001/${res.data.path}.pdf`, '_blank')
    //     })
    // }

    limparHistorioco = () => {
        this.setState({ itensHistorico: null })

        Cookies.remove('historico');
    }

    static contextType = CarrinhoContext

    render() {

        const { addCarrinho } = this.context
        let today = new Date();

        let ddInicio = String(today.getDate() + 2).padStart(2, '0');
        let ddFinal = String(today.getDate() + 8).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');

        return (
            <div>
                {this.state.produto !== null ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <div className="produto">
                            <div className="img" onLoad={() => {
                                var elems = document.querySelectorAll('.materialboxed');
                                M.Materialbox.init(elems);
                            }}>
                                <img data-caption={this.state.produto.titulo} className="materialboxed" src={this.state.produto.image} />
                            </div>



                            <div className="comprar card">
                                <div className="infos">
                                    {this.state.editar ?
                                        <div style={{ width: "100%" }}>
                                            <input type="text" name="titulo" id="titulo" value={this.state.produto.titulo} />
                                            <input type="number" name="preco" id="preco" value={this.state.produto.preco} />
                                            <button className="btn black center"> Salvar </button>
                                        </div>
                                        :
                                        <div>
                                            <h4>
                                                {this.state.produto !== null ? this.state.produto.titulo : <div>Carregando...</div>}
                                            </h4>

                                            <h4>
                                                {this.state.produto !== null ?
                                                    <div><span className="grey-text">Preço:</span> <span className="green-text">R$:{this.state.produto.preco}</span></div>
                                                    :
                                                    null
                                                }
                                            </h4>

                                            <div className="frete">
                                                <div className="green-text">Frete gratis</div>
                                                <div> Chegará entre os dias {ddInicio}/{mm} e {ddFinal}/{mm} </div>
                                            </div>

                                        </div>
                                    }
                                </div>

                                <div className="botoes" >
                                    <button onClick={this.comprarBoleto} className="btn-large white black-text waves-effect waves-green">Comprar Agora</button>
                                    <button
                                        onClick={() => {
                                            this.props.history.push('/carrinho')
                                            addCarrinho(this.state.produto)
                                        }}
                                        className="btn-large black waves-effect waves-green"
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                    {/* <button onClick={() => this.setState({ editar: !this.state.editar })} className="btn black waves-effect waves-green">Editar Item</button> */}
                                </div>
                            </div>
                        </div>

                        <div>
                            {this.state.itensHistorico !== null ?
                                <div>
                                    <div>
                                        <div className="center" style={{ padding: 30 }}>
                                            <span style={{ fontSize: 30 }}>Historico</span>
                                            <div
                                                className="right"
                                                onClick={this.limparHistorioco}
                                                style={{ marginTop: 15, cursor: "pointer" }}
                                            >
                                                Limpar historico</div>
                                        </div>

                                    </div>
                                    <ul className="ulItens" style={{ display: 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center' }}>
                                        {this.state.itensHistorico.historicoBase.map((dat) => (
                                            <Item key={dat._id} data={dat} />
                                        ))
                                        }
                                    </ul>
                                </div>
                                : null}
                        </div>
                    </div>
                ) : (
                        <ProgressBar />
                    )}
            </div>
        )
    }
}

export default Produto