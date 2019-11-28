import React from 'react'
import { Link } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

export default function NavRender(props) {
    const { nome, sidenavClose, itemTotal } = props
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="nav-wrapper black darken-3" style={{ padding: '0px 4% 0px 4%' }}>
                    <div className="conteiner">
                        <Link to="/" className="brand-logo">HappyHardware</Link>
                        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

                        <div>
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link
                                        data-position="bottom"
                                        data-tooltip="Minhas compras!"
                                        style={{ marginTop: 3 }}
                                        className="tooltipped"
                                        onMouseEnter={() => {
                                            var elems = document.querySelectorAll('.tooltipped');
                                            M.Tooltip.init(elems, { margin: 0, enterDelay: 100, exitDelay: 0 });
                                        }}
                                        to="/compras">
                                        <i className="material-icons">attach_money</i>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        data-position="bottom"
                                        data-tooltip="Pesquisar"
                                        style={{ marginTop: 3 }}
                                        className="tooltipped"
                                        onMouseEnter={() => {
                                            var elems = document.querySelectorAll('.tooltipped');
                                            M.Tooltip.init(elems, { margin: 0, enterDelay: 100, exitDelay: 0 });
                                        }}
                                        to="/pesquisar">
                                        <i className="material-icons">search</i>
                                    </Link>
                                </li>
                                <li><Link
                                    data-position="bottom"
                                    data-tooltip="Carrinho"
                                    style={{ marginTop: 3, position: "relative" }}
                                    className="tooltipped"
                                    onMouseEnter={() => {
                                        var elems = document.querySelectorAll('.tooltipped');
                                        M.Tooltip.init(elems, { margin: 0, enterDelay: 100, exitDelay: 0 });
                                    }}
                                    to="/carrinho"><i className="material-icons">shopping_basket</i>
                                </Link></li>
                                <li style={{ lineHeight: "45px" }}>
                                    {itemTotal ? <small style={{ color: "white" }}>{itemTotal}</small> : null}
                                </li>
                                {nome === null ? (
                                    <span>
                                        <li><Link to="/registrar">Criar Conta</Link></li>
                                        <li><Link to="/entrar">Entrar</Link></li>
                                    </span>
                                ) : (
                                        <span>
                                            <li><Link to="/adicionar">Adicionar Item</Link></li>
                                            <li><Link to="/perfil">{nome}</Link></li>
                                        </span>
                                    )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <ul onClick={sidenavClose} className="sidenav" id="mobile-demo">
                <li className="center" style={{ borderBottom: "1px solid black" }}>
                    <img
                        style={{ width: 200 }}
                        src="https://res.cloudinary.com/teepublic/image/private/s--FJZqs78i--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1529186807/production/designs/2794176_2.jpg"
                        alt="Chika Dancing" />
                </li>
                <li style={{ marginTop: 10 }}>
                    <Link to="/" className="brand-logo">
                        <i className="material-icons">home</i>
                        Inicio
                        </Link>
                </li>
                <li >
                    <Link
                        style={{ marginTop: 3 }}
                        to="/carrinho">Carrinho
                    <i className="material-icons">shopping_basket</i>
                        {itemTotal ? <span class="new badge black" data-badge-caption={itemTotal > 1 ? "itens" : "item"} >{itemTotal}</span> : null}
                    </Link>
                </li>
                <li >
                    <Link
                        style={{ marginTop: 3 }}
                        to="/pesquisar">Pesquisar
                    <i className="material-icons">search</i>
                    </Link>
                </li>
                {nome === null ?
                    <div>
                        <li>
                            <Link to="/registrar">
                                <i className="material-icons">person_add</i>
                                Criar Conta
                                </Link>
                        </li>

                        <li><Link to="/entrar">
                            <i className="material-icons">subdirectory_arrow_right</i>
                            Entrar</Link></li>
                    </div>
                    :
                    <div>
                        <li>
                            <Link to="/adicionar">Adicionar Item
                            <i className="material-icons">add</i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/perfil">
                                <i className="material-icons">person</i>
                                {nome}</Link>
                        </li>
                    </div>
                }
            </ul>
        </div >
    )
}
