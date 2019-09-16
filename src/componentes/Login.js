import React, { Component } from 'react';
import axios from 'axios';
import * as Cookies from 'es-cookie';
import {  Link  } from 'react-router-dom'
//Estilo
import './css/styleLogin.css'

var jwt = require('jsonwebtoken');


class AdcProduto extends Component {
    componentDidMount(){
        let token = Cookies.get('token')
        if (token){
            this.props.history.push('/perfil');
        }
    }
    state = {
        email: null,
        senha: null,
        msg: null
    }
    aomudar = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    entrar = (email, senha) => {
        axios.post('https://restprojeto.herokuapp.com/api/login', {
            email, senha
        })
        .then((res) =>{
            const { msg, success, user } = res.data;

            // Remover Cookie
            // Cookies.remove('token');
            if(success){
                var token = jwt.sign({ user }, 'HifumiBestWaifu');

                // Adiciona cookie
                Cookies.set('token', token);
                this.props.history.push('/perfil');

                // Remover Cookie
                // Cookies.remove('token');

                // Ler Token
                // var token = Cookies.get('token')
                // var decoded = jwt.verify(token, 'HifumiBestWaifu');
                // console.log(decoded.user.email) // bar
            } else {
                this.setState({
                    msg
                })
            }

            // console.log(Cookies.get('token'))
            // this.setState({
            //     error
            // })

    //     if (success){
    //         window.location.href = `${__dirname}`
    //     }
        });
    }
    render(){
        const { email, senha, msg } = this.state
        return(
           <div className="conteiner-login loginConteiner">
                 <form action='/' onSubmit={ (e) => {e.preventDefault()}} className="login">
                    <h3 className="center">Entrar</h3>
                    { msg !== null ? <div className="red-text">{msg}</div> : null }
                    <input type="email" name="email" id="email" placeholder="Email..." onChange={this.aomudar}/>
                    <input type="password" name="senha" id="senha" placeholder="Senha..." onChange={this.aomudar}/>
                    <div className="center botoes">
                        <button style={{marginTop: 25}} className="btn center black" onClick={(e)=> {
                            e.preventDefault()
                            this.entrar(email, senha)
                            }}>Entrar</button>
                    </div>
                    <Link style={{marginTop: 15, color: 'black'}} to="/registrar">Não possui uma conta? Clique aqui</Link>
                </form> 
            </div>
        )
    }
}

export default AdcProduto;