import React from 'react';
import './css/styleInicio.css'
import { ProgressBar } from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import { NavLink } from 'react-router-dom'

import SideBar from './partes/sideBar'
import Item from './partes/Item'

const Inicio = (data) => {
    let dataUsuarios = []
    if (data.data !== undefined && data.data.length > 0) {
        dataUsuarios = data.data
    }
    return (
        <div className="">
            {dataUsuarios.length <= 0
                ?

                <div><ProgressBar /></div>

                :

                <div className="tudos">
                    <div className="hide-on-med-and-down">
                        <SideBar data={data.data} />
                    </div>
                    <ul
                        className="ulItens"
                        style={{ display: 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center' }}
                    >
                        {dataUsuarios.map((dat) => (
                            <Item key={dat._id} data={dat} />
                        ))}
                    </ul>
                </div>
            }
            <div class="navbar hide-on-large-only">
                <ul style={{display: "flex", justifyContent: "center"}} className="itemSideBar">
                    <li><NavLink className="black-text" to="/inicio/celular">Celulares</NavLink></li> 
                    <li><NavLink className="black-text" to="/inicio/perifericos">Perifericos</NavLink></li> 
                    <li><NavLink className="black-text" to="/inicio/computadores">PC</NavLink></li> 
                    <li><NavLink className="black-text" to="/inicio/consoles">Consoles</NavLink></li> 
                </ul>
            </div>
        </div>
    )
}

export default Inicio