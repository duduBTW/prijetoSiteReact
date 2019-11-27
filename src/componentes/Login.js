import React, { Component } from 'react';
import axios from 'axios';
import * as Cookies from 'es-cookie';
import { Link } from 'react-router-dom'
//Estilo
import './css/styleLogin.css'
import M from "materialize-css";
import { UsuarioContext } from './context/UsuarioContext'

var jwt = require('jsonwebtoken');


class AdcProduto extends Component {

    state = {
        email: null,
        senha: null,
        msg: null
    }

    static contextType = UsuarioContext

    componentDidMount() {
        let token = Cookies.get('token')
        if (token) {
            this.props.history.push('/perfil');
        }
    }

    aomudar = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    entrar = (email, senha) => {
        if (!email || !senha) {
            M.Toast.dismissAll();
            M.toast({ html: "Ambos os campos devem ser preenchidos", displayLength: 6000, classes: 'red darken-3' })
        } else {
            axios.post('https://restprojeto.herokuapp.com/api/login', {
                email, senha
            })
                .then((res) => {
                    const { msg, success, user } = res.data;

                    // Remover Cookie
                    if (success) {
                        var token = jwt.sign({ user }, 'HifumiBestWaifu');
                        const { addProp } = this.context

                        // Adiciona cookie
                        Cookies.set('token', token);
                        addProp(user.email, user.nome, user.cartao, user.endereco)

                        this.props.history.push('/perfil');
                    } else {
                        this.setState({
                            msg
                        })
                        M.Toast.dismissAll();
                        M.toast({ html: msg, displayLength: 6000 })
                    }
                });
        }
    }
    render() {
        const { email, senha, msg } = this.state
        return (
            <div className="conteiner-login loginConteiner">
                <form action='/' onSubmit={(e) => { e.preventDefault() }} className="login">
                    <h3 className="center">Entrar</h3>
                    {/* { msg !== null ? <div className="red-text">{msg}</div> : null } */}
                    <div className="input-field" style={{ width: "100%" }}>
                        <input className="validate" type="email" name="email" id="email" onChange={this.aomudar} />
                        <label for="email">Email</label>
                        <span className="helper-text" data-error="Email inválido" data-success="certo"></span>
                    </div>
                    <div className="input-field" style={{ width: "100%" }}>
                        <input type="password" name="senha" id="senha" onChange={this.aomudar} />
                        <label for="senha">Senha</label>
                    </div>
                    <div className="center botoes">
                        <button style={{ marginTop: 25 }} className="btn center black" onClick={(e) => {
                            e.preventDefault()
                            this.entrar(email, senha)
                        }}>Entrar</button>
                    </div>
                    <Link style={{ marginTop: 15, color: 'black' }} to="/registrar">Não possui uma conta? Clique aqui</Link>
                </form>
            </div>
        )
    }
}

export default AdcProduto;