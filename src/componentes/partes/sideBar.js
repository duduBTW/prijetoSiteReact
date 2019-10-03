import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { NavLink } from 'react-router-dom'

const SideBar = (data) => {
    const estilo = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    const [itens, setItens] = useState("");
    let pog = "";
    if (itens === "") {
        data.data.map(dat => {
            const item = `"${dat.titulo}": "${dat.image}",`
            pog += item
        });
        pog = eval('({' + pog + '})');
        setItens(pog)
    }
    // itens.map(item => {
    //     console.log(item)
    // })
    return (
        <div>
            <ul id="slide-out" style={{ marginTop: 65 }} className="itemSideBar sidenav sidenav-fixed">
                <div className="input-field">
                    <input
                        id="autocomplete-input"
                        className="autocomplete"
                        type="text"
                        placeholder="Pesquisar..."
                        onChange={() => {
                            var elems = document.querySelectorAll('.autocomplete');
                            M.Autocomplete.init(elems, {
                                data: itens,
                                minLength: 3
                            });
                        }}
                    />
                </div>
                <li><NavLink className="black-text" to="/inicio/todos">TODOS</NavLink></li>
                <li><NavLink className="black-text waves-effect" to="/inicio/celular">CELULARES</NavLink></li>
                <li><NavLink className="black-text waves-effect" to="/inicio/perifericos">PERIFÉRICOS</NavLink></li>
                <li><NavLink className="black-text waves-effect" to="/inicio/computadores">COMPUTADORES</NavLink></li>
                <li><NavLink className="black-text waves-effect" to="/inicio/consoles">CONSOLES</NavLink></li>
            </ul>
            <a style={{ display: "none" }} href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    )
}

export default SideBar
