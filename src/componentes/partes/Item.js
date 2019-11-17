import React from 'react';
import { Link } from 'react-router-dom'

const Item = (data) => {
    const dat = data.data
    const item = {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        margin: '7px',
        padding: '10px',
        transition: '0.2s',
        borderRadius: '4px',
        maxHeight: '389px',
        maxWidth: '270'
    }
    const titulo = {
        paddingTop: '8px',
        marginTop: '10px',
        borderTop: '1px solid black',
        height: 'auto',
        width: 270,
        fontSize: 17
    }
    return (
        <div className="img" data-aos-duration="270" data-aos="fade-up" data-aos-easing="ease-out-cubic" data-aos-anchor-placement="top-bottom" >
            <li style={item} className="center item">
                <Link style={{ color: "black", height: 'auto', width: 270, margin: 0 }} key={dat._id} to={`/produto/${dat.titulo.replace(/ /g, "_")}`}>
                    <div><img style={{ height: 300, width: 270 }} src={dat.image} alt={dat.titulo} /></div>
                    <div className="center">
                        <div className="titulo" style={titulo}>{dat.titulo.length < 30 ?
                            dat.titulo :
                            <div>{dat.titulo.substring(0, dat.titulo.length - (dat.titulo.length - 30))}...</div>}
                        </div>
                        <div style={{ height: 'auto', width: 270, fontSize: 17 }}>
                            R$:{dat.preco}
                        </div>
                    </div>
                </Link>
            </li>
        </div>
    )
}

export default Item
