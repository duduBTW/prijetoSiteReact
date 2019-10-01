import React, { Component } from 'react';
import * as Cookies from 'es-cookie';
import { Link } from 'react-router-dom'
import './css/stylePerfil.css'
import MostrarCartao from './verCartao';
import Cartao from './creditCard'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

var jwt = require('jsonwebtoken');

class perfil extends Component {
    state = {
        email: null,
        nome: null
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
                        <li className="tab right"><button className="black btn" onClick={this.Sair}>Sair</button></li>
                    </ul>
                    <div id="test-swipe-1"></div>
                    <div id="test-swipe-2">
                        <MostrarCartao />
                        <button
                            style={{margin: 20}} 
                            className="btn black"
                            onClick={() =>{
                            var instance = M.Tabs.init(document.querySelector('.tabs'));
                            instance.select('test-swipe-3');
                            }}>Editar
                        </button>
                    </div>
                    <div id="test-swipe-3"><Cartao attCartao={this.attCartao} email={email} /></div>
            </div>
        )
    }
}

export default perfil;