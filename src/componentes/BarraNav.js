import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const BarraNav = ({logado}) => {
    return(
        <div>
            <nav className="nav-wrapper red darken-3">
                <div className="conteiner">
                    <Link to="/" className="brand-logo">Produtos</Link>
                    <ul className="right">
                        <li><Link to="/">Inicio</Link></li>
                        <li><NavLink to="/entrar">{logado  === false ? 'Login' : 'Perfil'}</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default BarraNav