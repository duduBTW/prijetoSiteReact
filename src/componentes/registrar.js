import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {  Link  } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

import './css/styleRegistrat.css'

class AdcProduto extends Component {
    state = {
        nome: null,
        email: null,
        senha: null,
        senha2: null,
        error: null
    }
    aomudar = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    registrar = (nome, email, senha, senha2) => {
        if(!nome || !email || !senha || !senha2){
            this.setState({
                error : [{msg: 'Por favor preencha todos os campos'}]
            })
        } else if (senha.length < 6){
            this.setState({
                error : [{msg: 'Senha tem que ter no minimo 6 caracteres'}]
            })
        } else if (senha !== senha2){
            this.setState({
                error : [{msg: 'Senhas diferentes'}]
            })
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
    }
    render(){
        const { nome, email, senha, senha2, error } = this.state
        return(
           <div className="conteiner-login regConteiner">
                 <form action='/' onSubmit={ (e) => {e.preventDefault()}} className="reg">
                    <h3 className="center">Criar conta</h3>
                    {error ? (
                        error.map(erro =>(
                            <div key={erro.msg} className='red-text'>{erro.msg}</div>
                        ))
                    )
                    : null }
                    <div className="itens">
                        <div style={{display: "flex"}}>
                            <div className="input-field">
                                <input type="text" name="nome" id="nome" onChange={this.aomudar}/>
                                <label for="nome">Nome</label>
                            </div>
                            <div className="input-field">
                                <input type="text" name="cpf" id="cpf" onChange={this.aomudar}/>
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