import React, { Component } from 'react';
import * as Cookies from 'es-cookie';
import axios from 'axios';
// import { Link } from 'react-router-dom'
import './css/stylePerfil.css'
import MostrarCartao from './verCartao';
import Endereco from './partes/endereco';
// import Cartao from './creditCard'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { UsuarioContext } from './context/UsuarioContext'

import {
    formatCpf
} from './things/utils';

var jwt = require('jsonwebtoken');

class perfil extends Component {

    static contextType = UsuarioContext

    state = {
        email: '',
        nome: '',
        cpf: null,
        nomeDestinatario: '',
        estado: '',
        cep: '',
        bairro: '',
        numero: ''
    }

    componentDidMount() {
        M.Tabs.init(document.querySelector(".tabs"), { swipeable: false });
        // Ler Token
        var token = Cookies.get('token')
        if (token) {
            var decoded = jwt.verify(token, 'HifumiBestWaifu');
            const { cartao } = decoded.user

            // const { addProp } = this.context
            // addProp(email, nome)
            this.setState({
                cartao
            })
        } else {
            this.props.history.push('/entrar');
        }
    }

    attCartao = (cartao) => {
        this.setState({ cartao })
    }

    aomudar = (e) => {
        if (e.target.name === 'cpf') {
            e.target.value = formatCpf(e.target.value);
        }
        this.setState({
            [e.target.id]: e.target.value
        })
        if (this.state.cpf !== null) {
            console.log(this.state.cpf.replace(/\s/g, ''))
        }
    }

    Sair = () => {
        // Remover Cookie
        Cookies.remove('token');

        const { addProp } = this.context
        addProp(null, null)

        this.props.history.push('/entrar');
    }

    salvarAlteracoes = () => {
        const { email, nome, cpf } = this.state
        axios.post('http://localhost:3001/api/updatePerfil', {
            email,
            nome,
            cpf: cpf.replace(/\s/g, ''),
            emailAntigo: this.context.email
        })
    }

    render() {
        const { cartao } = this.state
        const { nome, email, estado } = this.state
        return (
            <div className="tudo">
                <div>
                    <h3> {this.context.nome}</h3>
                </div>
                {/* <ul className="tabs">
                        <li className="tab col s3"><Link onClick={() => this.props.history.push('/perfil/')} className="active black-text">Inicio</Link></li>
                        <li className="tab">
                            {cartao !== undefined ? 
                                <Link onClick={() => this.props.history.push('/perfil/verCartao')} className="black-text">Ver cartão</Link> 
                            : 
                                <Link onClick={() => this.props.history.push('/perfil/card')} className="black-text">Adicionar Cartão</Link>}
                        </li>
                        <li className="tab right"><button className="black btn" onClick={this.Sair}>Sair</button></li>
                    </ul> */}
                <ul id="tabs-swipe-demo" className="tabs">
                    <li className="tab col s3"><a className="active" href="#swpeInicio">Inicio</a></li>
                    <li className="tab col s3"><a href="#test-swipe-2">Cartão</a></li>
                    <li className="tab col s3"><a href="#test-swipe-3">Endereço</a></li>
                    <li className="tab col s3"><a href="#test-swipe-4">Editar Conta</a></li>
                    <li className="tab right"><button className="black btn" onClick={this.Sair}>Sair</button></li>
                </ul>
                <div id="swpeInicio">
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "4%" }}>
                        <img style={{ width: "40%" }} src="https://steamuserimages-a.akamaihd.net/ugc/1001393370184877162/3EAA5212E7118DFFF86C26BC70E3E6245E23C9C8/" />
                    </div>
                </div>
                <div id="test-swipe-2">
                    <MostrarCartao />
                    <div>
                        <button
                            style={{ margin: 20 }}
                            className="btn black"
                            onClick={() => {
                                {/* var instance = M.Tabs.init(document.querySelector('.tabs'));
                                instance.select('test-swipe-3'); */}
                                this.props.history.push('/card')
                            }}
                        >
                            Editar
                            </button>
                    </div>
                </div>

                <div id="test-swipe-3" style={{ width: '90vw' }}>
                    <Endereco {...this.props} />
                </div>

                <div id="test-swipe-4">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4%" }} >
                        <div className="input-field">
                            <input className="validate" type="email" name="email" id="email" value={email} onChange={this.aomudar} />
                            <label className="active" for="email">Editar Email</label>
                            <span className="helper-text" data-error="Email inválido" data-success="certo"></span>
                        </div>
                        <div className="input-field">
                            <input className="validate" type="text" name="nome" id="nome" value={nome} onChange={this.aomudar} />
                            <label className="active" for="nome">Editar Nome</label>
                        </div>
                        <div className="input-field">
                            <input className="validate" name="cpf" onChange={this.aomudar} id="cpf" />
                            <label className="active" for="cpf">Editar Cpf</label>
                        </div>
                        <div>
                            <button
                                style={{ margin: 20 }}
                                className="btn black"
                                onClick={() => {
                                    this.salvarAlteracoes()
                                    var instance = M.Tabs.init(document.querySelector('.tabs'));
                                    instance.select('test-swipe-1');
                                }}>Salvar Alterações
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default perfil;