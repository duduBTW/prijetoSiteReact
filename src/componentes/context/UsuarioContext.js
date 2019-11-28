import React, { createContext, Component } from 'react';
import * as Cookies from 'es-cookie';

const jwt = require('jsonwebtoken');

export const UsuarioContext = createContext();

class UsuarioContextProvider extends Component {
    state = {
        email: null,
        nome: null,
        cartao: null,
        endereco: null
    }
    componentDidMount() {
        var token = Cookies.get('token')
        if (token) {
            var decoded = jwt.verify(token, 'HifumiBestWaifu');
            const { email, nome, cartao, endereco } = decoded.user

            this.setState({ email, nome, cartao, endereco })
        }
    }

    addProp = (email, nome, cartao, endereco) => {
        this.setState({ nome, email, cartao, endereco })
    }

    addEnd = (endereco) => {
        this.setState({ endereco })
    }

    addCard = (cartao) => {
        this.setState({ cartao })
    }

    render() {
        return (
            <UsuarioContext.Provider value={{ ...this.state, addProp: this.addProp }}>
                {this.props.children}
            </UsuarioContext.Provider>
        )
    }
}

export default UsuarioContextProvider