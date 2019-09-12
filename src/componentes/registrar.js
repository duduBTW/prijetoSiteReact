import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {  Link  } from 'react-router-dom'

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
                    <input type="text" name="nome" id="nome" placeholder="Nome..." onChange={this.aomudar}/>
                    <input type="email" name="email" id="email" placeholder="Email..." onChange={this.aomudar}/>
                    <input type="password" name="senha" id="senha" placeholder="Senha..." onChange={this.aomudar}/>
                    <input type="password" name="senha2" id="senha2" placeholder="Confirmar senha..." onChange={this.aomudar}/>
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