import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class CriarConta extends Component {
    state = {
        usuario: '',
        senha: '',
        tipo: 'Usuario'
    }
    aoEnviar = (e) => {
        e.preventDefault()
        if((this.state.usuario !== '') && (this.state.senha !== '') ) {
            this.props.novaConta(this.state)
            this.setState({
                usuario: '',
                senha: '',
                tipo: null
            })
            alert('Conta criada com sucesso')
            document.getElementById('usuario').value = ''
            document.getElementById('senha').value = ''
            this.props.history.push('/entrar')
        } else {
            alert('Ambos os campors devem ser preenchidos')
        }
        
        
        
    }
    aoMudar = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
        return(
             <div className="conteiner-login">
                 <form onSubmit={this.aoEnviar}>
                    <h3 className="center">Criar Conta</h3>
                    <input type="text" name="usuario" id="usuario" placeholder="Login..." onChange={this.aoMudar}/>
                    <input type="password" name="senha" id="senha" placeholder="Senha..." onChange={this.aoMudar}/>
                    <div className='select'>
                    <select id="tipo" value={this.state.value} onChange={this.aoMudar}>
                        <option value="Usuario">Usuario</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    </div>
                    <div className="center botoes">
                        <button className="btn center" type="submit">Criar</button>
                        <Link className="voltar btn" to="/entrar">Voltar</Link> 
                    </div>
                </form> 
            </div>
        )
    }
}

export default withRouter(CriarConta)