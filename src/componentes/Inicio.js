import React, { Component } from 'react';
import './css/styleInicio.css'
import { ProgressBar } from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';


import SideBar from './partes/sideBar'
import Item from './partes/Item'
import BottomBar from './partes/BottomBar';
import { DataContext } from './context/DataContext';

class Inicio extends Component {
    render() {
        return (
            <DataContext.Consumer>{(DataContext) => {
                const { data } = DataContext

                return (
                    <div className="">
                        {data === null
                            ?

                            <div><ProgressBar /></div>

                            :

                            <div className="tudos">
                                <div className="hide-on-med-and-down">
                                    <SideBar data={data} />
                                </div>
                                <ul
                                    className="ulItens"
                                    style={{ display: 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center' }}
                                >
                                    {data.map((dat) => (
                                        <Item key={dat._id} data={dat} />
                                    ))}
                                </ul>
                            </div>
                        }
                        <BottomBar />
                    </div>
                )
            }}
            </DataContext.Consumer>
        )
    }
}

export default Inicio