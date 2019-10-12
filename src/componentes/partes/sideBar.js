import React from 'react';
import { NavLink } from 'react-router-dom'

const SideBar = (data) => {
    const estilo = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    // itens.map(item => {
    //     console.log(item)
    // })

    return (
        <div>
            <ul id="slide-out" style={{ marginTop: 65, width: 250 }} className="itemSideBar sidenav sidenav-fixed">
                <li><NavLink className="black-text waves-effect center" to="/inicio/todos">TODOS</NavLink></li>
                <li><NavLink className="black-text waves-effect center" to="/inicio/celular">CELULARES</NavLink></li>
                <li><NavLink className="black-text waves-effect center" to="/inicio/perifericos">PERIFÉRICOS</NavLink></li>
                <li><NavLink className="black-text waves-effect center" to="/inicio/computadores">COMPUTADORES</NavLink></li>
                <li><NavLink className="black-text waves-effect center" to="/inicio/consoles">CONSOLES</NavLink></li>
            </ul>
            <a style={{ display: "none" }} href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    )
}

export default SideBar
