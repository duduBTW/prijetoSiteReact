import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import './css/styleInicio.css'
import { ProgressBar } from 'react-materialize';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';

import SideBar from './partes/sideBar'
import Item from './partes/Item'
import BottomBar from './partes/BottomBar';

class InicioEsp extends Component {
    state = {
        dataUsuarios: []
    }
    componentWillMount() {
        // Quando você clica no filtro
        this.setState({ dataUsuarios: null })
        if (this.props.match !== undefined) {
            if (this.props.match.params.filtro === 'todos') {
                this.props.history.push('/');
            } else {
                this.getProdEsp(this.props.match.params.filtro);
            }
        }
    }
    componentWillReceiveProps(props) {
        // Quando você clica no filtro
        this.setState({ dataUsuarios: null })
        if (this.props.dataUsuarios !== []) {
            if (props.match.params.filtro === 'todos') {
                this.props.history.push('/');
            } else {
                this.getProdEsp(props.match.params.filtro);
            }
        }
        window.scrollTo(0, 0);
    }
    getProdEsp = (prod) => {
        axios.post('https://restprojeto.herokuapp.com/api/getProdutoEsp', {
            pord: prod
        })
            .then(dat => {
                this.setState({ dataUsuarios: dat.data.data })
            });
    };
    render() {
        const { dataUsuarios } = this.state
        return (
            <div className="">
                {dataUsuarios !== null ?
                    null
                    :
                    <div className="progresso">
                        <ProgressBar />
                    </div>
                }
                <div>
                    <div className="tudos">
                        <div className="hide-on-med-and-down">
                            <SideBar data={this.props.data} />
                        </div>
                        {dataUsuarios !== null ?
                            <ul className="ulItens" style={{ display: 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center' }}>
                                {dataUsuarios.map((dat) => (
                                    <Item key={dat._id} data={dat} />
                                ))}
                            </ul>
                            :
                            null
                        }
                    </div>
                </div>

                <BottomBar />
            </div>
        )
    }
}

export default InicioEsp