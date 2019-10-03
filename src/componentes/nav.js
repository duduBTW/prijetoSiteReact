import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Cookies from 'es-cookie';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
class Nav extends Component {
    componentDidMount() {
        var token = Cookies.get('token')
        if (token) {
            // var decoded = jwt.verify(token, 'HifumiBestWaifu');
            // const { email, nome } = decoded.user
            // this.setState({
            //     email,
            //     nome
            // })
        }
        var elems = document.querySelectorAll('.sidenav')
        var instances = M.Sidenav.init(elems);
    }
    sidenavClose = () => {
        var elems = document.querySelectorAll('.sidenav')
        var instances = M.Sidenav.init(elems);
    }
    render() {
        const { nome } = this.props
        return (
            <div>
            <div className="navbar-fixed">
                <nav className="nav-wrapper black darken-3" style={{ padding: '0px 150px 0px 150px' }}>
                    <div className="conteiner">
                        <Link to="/" className="brand-logo">Happy Hardware</Link>
                        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        {nome === null ?
                            (
                                <div>
                                    <ul className="right hide-on-med-and-down">
                                        <li><Link
                                            data-position="bottom"
                                            data-tooltip="Carrinho"
                                            style={{ marginTop: 3 }}
                                            className="tooltipped"
                                            onMouseEnter={() => {
                                                var elems = document.querySelectorAll('.tooltipped');
                                                M.Tooltip.init(elems, { margin: 0, enterDelay: 100, exitDelay: 0 });
                                            }}
                                            to="/carrinho"><i className="material-icons">shopping_basket</i></Link></li>
                                        <li><Link to="/registrar">Criar Conta</Link></li>
                                        <li><Link to="/entrar">Entrar</Link></li>
                                    </ul>
                                </div>
                            ) :
                            (
                                <ul className="right hide-on-med-and-down">
                                    <li>
                                        <Link
                                        data-position="bottom"
                                        data-tooltip="Carrinho"
                                        style={{ marginTop: 3 }}
                                        className="tooltipped"
                                        onMouseEnter={() => {
                                            var elems = document.querySelectorAll('.tooltipped');
                                            M.Tooltip.init(elems, { margin: 0, enterDelay: 100, exitDelay: 0 });
                                        }}
                                        to="/carrinho"><i className="material-icons">shopping_basket</i></Link>
                                    </li>
                                    <li><Link to="/adicionar">Adicionar Item</Link></li>
                                    <li><Link to="/perfil">{nome}</Link></li>
                                </ul>
                            )
                        }
                    </div>
                </nav>
            </div>
            
                <ul onClick={this.sidenavClose} className="sidenav" id="mobile-demo">
                    <li>
                    <Link to="/" className="brand-logo">Inicio</Link>

                    </li>
                <li >
                    <Link 
                    data-position="bottom"
                    data-tooltip="Carrinho"
                    style={{ marginTop: 3 }}
                    to="/carrinho">Carrinho</Link>
                </li>
                {nome === null ?
                <div>
                    <li><Link to="/registrar">Criar Conta</Link></li>
                    <li><Link to="/entrar">Entrar</Link></li>
                </div>
                :  
                <div>
                    <li><Link to="/adicionar">Adicionar Item</Link></li>
                    <li><Link to="/perfil">{nome}</Link></li>
                </div>
                }
                </ul>
            </div>
        )
    }
}

export default Nav