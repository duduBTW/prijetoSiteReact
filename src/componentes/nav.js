import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { UsuarioContext } from './context/UsuarioContext'
import NavRender from './render/NavRender';
import { CarrinhoContext } from './context/CarrinhoContext';

class Nav extends Component {

    static contextType = UsuarioContext

    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav')
        M.Sidenav.init(elems);
    }
    sidenavClose = () => {
        var elems = document.querySelectorAll('.sidenav')
        M.Sidenav.init(elems);
    }
    render() {
        return (
            <CarrinhoContext.Consumer>{(carrinho) => {
                return (
                    <UsuarioContext.Consumer>{(usuario) => {
                        const { nome } = usuario;
                        const { itemTotal } = carrinho
                        return (
                            <NavRender nome={nome} itemTotal={itemTotal} sidenavClose={this.sidenavClose} />
                        )
                    }}
                    </UsuarioContext.Consumer>
                )
            }}
            </CarrinhoContext.Consumer>
        )
    }
}

export default Nav