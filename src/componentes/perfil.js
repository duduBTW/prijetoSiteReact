import React, { Component } from 'react';
import * as Cookies from 'es-cookie';
import { Link } from 'react-router-dom'
import './css/stylePerfil.css'

var jwt = require('jsonwebtoken');

class perfil extends Component {
    state = {
        email: null,
        nome: null
    }
    componentDidMount(){
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
                    <nav className='nav-wrapper white'>
                    <ul className="">
                    <li>{cartao !== undefined ? <Link to={'/perfil/verCartao'} className="black-text">Ver cartão</Link> : <Link to={'/perfil/card'} className="black-text">Adicionar Cartão</Link>}</li>
                    <li className="right"><a className="black-text " onClick={this.Sair}>Sair</a></li>
                    </ul>
                    
                    </nav>

            </div>
        )
    }
}

export default perfil;