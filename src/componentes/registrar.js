import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {  Link  } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import './css/styleRegistrat.css'

import {
    formatCpf
  } from './things/utils';

class AdcProduto extends Component {
    state = {
        nome: null,
        email: null,
        senha: null,
        senha2: null,
        error: null
    }
    aomudar = (e) => {
        if (e.target.name === 'cpf') {
            e.target.value = formatCpf(e.target.value);
        }
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    registrar = (nome, email, senha, senha2) => {
        let error = null
        if(!nome || !email || !senha || !senha2){
            // this.setState({
            //     error : [{msg: 'Por favor preencha todos os campos'}]
            // })
            error = 'Por favor preencha todos os campos'
        } else if (senha.length < 6){
            // this.setState({
            //     error : [{msg: 'Senha tem que ter no minimo 6 caracteres'}]
            // })
            error = 'Senha tem que ter no minimo 6 caracteres'
        } else if (senha !== senha2){
            // this.setState({
            //     error : [{msg: 'Senhas diferentes'}]
            // })
            error = 'Senhas diferentes'
        } else {
            axios.post('https://restprojeto.herokuapp.com/api/putUser', {
                nome, email, senha, senha2
            })
                .then((res) =>{
                    const { error, success } = res.data;
                    this.setState({
                    error
                    })
                    
                if (success){
                    Swal.fire({
                        type: 'success',
                        title: 'Conta criada com sucesso'
                    })
                    .then((result) => {
                        if(result){
                            this.props.history.push('/entrar');
                        }
                    })
                }
            });
        }
        if(error !== null){
            M.Toast.dismissAll();
            M.toast({html: error, displayLength: 6000})
        }
    }
    render(){
        const { nome, email, senha, senha2, error } = this.state
        return(
           <div className="conteiner-login regConteiner">
                 <form action='/' onSubmit={ (e) => {e.preventDefault()}} className="reg">
                    <h3 className="center">Criar conta</h3>
                    <div className="itens">
                        <div style={{display: "flex"}}>
                            <div className="input-field">
                                <input type="text" name="nome" id="nome" onChange={this.aomudar}/>
                                <label for="nome">Nome</label>
                            </div>
                            <div className="input-field">
                                <input type="text" 
                                name="cpf" 
                                onChange={this.handleInputChange}
                                id="cpf" 
                                onChange={this.aomudar}/>
                                <label for="cpf">Cpf</label>
                            </div>
                        </div>

                        <div>
                            <div className="input-field">
                                <input className="validate" type="email" name="email" id="email" onChange={this.aomudar}/>
                                <label for="email">Email</label>
                                <span className="helper-text" data-error="Email inválido" data-success="certo"></span>
                            </div>
                        </div>
                        <div style={{display: "flex"}}>
                            <div className="input-field">
                                <input type="password" name="senha" id="senha" onChange={this.aomudar}/>
                                <label for="senha">Senha</label>
                            </div>
                            <div className="input-field">
                                <input type="password" name="senha2" id="senha2" onChange={this.aomudar}/>
                                <label for="senha2">Confirmar senha</label>
                            </div>
                        </div>
                    </div>
                    <div className="center botoes">
                        <button className="btn center black" style={{marginTop: 25}} onClick={(e)=> {
                            e.preventDefault()
                            this.registrar(nome, email, senha, senha2)
                            }}>Criar</button>
                    </div>
                    <Link style={{marginTop: 15, color: 'black'}} to="/entrar">Já possui uma conta? Clique aqui</Link>
                </form> 
            </div>
        )
    }
}

export default AdcProduto;