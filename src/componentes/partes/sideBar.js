import React from 'react';
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    const estilo ={
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    return(
        <div data-aos-duration="270" data-aos="fade-right" data-aos-easing="ease-out-cubic" style={estilo} className="sideBar">
        <input type="text" placeholder="Pesquisar..."/>
            <ul className="itemSideBar">
                <li><NavLink className="black-text" to="/inicio/todos">TODOS</NavLink></li>
                <li><NavLink className="black-text" to="/inicio/celular">CELULARES</NavLink></li> 
                <li><NavLink className="black-text" to="/inicio/perifericos">PERIFÉRICOS</NavLink></li> 
                <li><NavLink className="black-text" to="/inicio/computadores">COMPUTADORES</NavLink></li> 
                <li><NavLink className="black-text" to="/inicio/consoles">CONSOLES</NavLink></li> 
            </ul>
        </div>
    )
}

export default SideBar
