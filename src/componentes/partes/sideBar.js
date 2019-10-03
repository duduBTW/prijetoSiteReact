import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import { NavLink } from 'react-router-dom'

const SideBar = (data) => {
    const estilo ={
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    const [itens, setItens] = useState("");
    let pog = "";
    if (itens === ""){
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
    console.log(itens)
    return(
        <div data-aos-duration="270" data-aos="fade-right" data-aos-easing="ease-out-cubic" style={estilo} className="sideBar">
            <div style={{width: "100%", padding: 10}} className="input-field">
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
