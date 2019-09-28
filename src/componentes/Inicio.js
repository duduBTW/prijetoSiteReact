import React from 'react';
import './css/styleInicio.css'
import { ProgressBar } from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';

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
                    <SideBar data={data.data} />
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
        </div>
    )
}

export default Inicio