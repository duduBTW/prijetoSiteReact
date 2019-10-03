import React, { Component } from 'react';
import * as Cookies from 'es-cookie';
import { storage } from '../firebase/index'
import './css/stylePerfil.css'
import MostrarCartao from './verCartao';
import Cartao from './creditCard'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import {
    formatCpf
  } from './things/utils';

var jwt = require('jsonwebtoken');

class perfil extends Component {
    state = {
        email: null,
        nome: null,
        cpf: null
    }
    componentDidMount(){
        M.Tabs.init(document.querySelector(".tabs"));
        // Ler Token
        var token = Cookies.get('token')
        if (token){
            var decoded = jwt.verify(token, 'HifumiBestWaifu');
            const { email, nome, cartao } = decoded.user
            this.props.addProp(email, nome)
            this.setState({
                email,
                nome,
                cartao
            })
        } else {
            this.props.history.push('/entrar');
        }
    }

    attCartao = (cartao) =>{
        this.setState({cartao})
    }

    aomudar = (e) => {
        if (e.target.name === 'cpf') {
            e.target.value = formatCpf(e.target.value);
        }
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    Sair = () =>{       
        // Remover Cookie
        Cookies.remove('token');
        this.props.addProp(null, null)
        this.props.history.push('/entrar');
    }
    render(){
        const { nome, email, cartao } = this.state
        return(
            <div className="tudo">
                    <div>
                        <h3> { nome }</h3>
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
                        <li className="tab col s3"><a className="active" href="#test-swipe-1">Inicio</a></li>
                        <li className="tab col s3"><a href="#test-swipe-2">Cartão</a></li>
                        <li className="tab col s3"><a href="#test-swipe-3">Editar Cartão</a></li>
                        <li className="tab col s3"><a href="#test-swipe-4">Editar Conta</a></li>
                        <li className="tab right"><button className="black btn" onClick={this.Sair}>Sair</button></li>
                    </ul>
                    <div id="test-swipe-1">
                       <div style={{display: "flex", justifyContent: "center", marginTop: "4%"}}>
                        <img style={{width: "50%"}} src="https://steamuserimages-a.akamaihd.net/ugc/1001393370184877162/3EAA5212E7118DFFF86C26BC70E3E6245E23C9C8/"/>
                       </div>
                    </div>
                    <div id="test-swipe-2">
                        <MostrarCartao />
                        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                            <button
                                style={{margin: 20}} 
                                className="btn black"
                                onClick={() =>{
                                var instance = M.Tabs.init(document.querySelector('.tabs'));
                                instance.select('test-swipe-3');
                                }}>Editar
                            </button>
                        </div>
                    </div>
                    <div id="test-swipe-3"><Cartao attCartao={this.attCartao} email={email} /></div>
                    <div id="test-swipe-4" style={{padding: "0px 150px 0px 150px"}}> 
                        <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4%"}} >
                            <div className="input-field" style={{ width: "40%"}}>
                                <input className="validate" type="email" name="email" id="email" value={email} onChange={this.aomudar} />
                                <label className="active" for="email">Editar Email</label>
                                <span className="helper-text" data-error="Email inválido" data-success="certo"></span>
                            </div>
                            <div className="input-field" style={{ width: "40%"}}>
                                <input className="validate" type="text" name="nome" id="nome" value={nome} onChange={this.aomudar} /> 
                                <label className="active" for="nome">Editar Nome</label>
                            </div>
                            <div className="input-field" style={{ width: "40%"}}>
                                <input className="validate" name="cpf" onChange={this.aomudar} id="cpf" /> 
                                <label className="active" for="cpf">Editar Cpf</label>
                            </div>
                            <div>
                                <button
                                    style={{margin: 20}} 
                                    className="btn black"
                                    onClick={() =>{
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