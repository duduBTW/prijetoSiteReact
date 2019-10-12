import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { UsuarioContext } from './context/UsuarioContext'
import NavRender from './render/NavRender';

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
        // const { nome } = this.props
        const { nome } = this.context
        return (
            <NavRender nome={nome} sidenavClose={this.sidenavClose} />
        )
    }
}

export default Nav