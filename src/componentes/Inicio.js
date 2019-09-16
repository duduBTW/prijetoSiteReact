import React, { Component } from 'react';
import { NavLink, Link  } from 'react-router-dom'
import './css/styleInicio.css'
import {  ProgressBar } from 'react-materialize';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';

class Inicio extends Component {
    state = {
        dataUsuarios: [],
        usuario: null,
        senha: null,
        nome: null
    }
    componentWillReceiveProps(props){
        // if(props.match.params.filtro === 'todos'){
        //     this.getUsuariosFromDb();
        // } else{
        //     this.setState({dataUsuarios: []})
        // }
        if(props.match !== undefined){
            if(props.match.params.filtro === 'todos'){
                this.getUsuariosFromDb();
                console.log('a')
            } else {
                this.getProdEsp(props.match.params.filtro);
            }
        }
    }
    componentDidMount(){
        if(this.props.match !== undefined){
            if(this.props.match.params.filtro === 'todos'){
                this.getUsuariosFromDb();
            } else {
                this.getProdEsp(this.props.match.params.filtro);
            }
        } else {
            this.getUsuariosFromDb();
        }
    }
    getUsuariosFromDb = () => {
        fetch('http://localhost:3001/api/getProdutos')
          .then((data) => data.json())
          .then((res) => this.setState({ dataUsuarios: res.data }));
      };

    getProdEsp = (prod) => {
        // fetch('http://localhost:3001/api/getProdutos')
        //   .then((data) => data.json())
        //   .then((res) => this.setState({ dataUsuarios: res.data }));
        axios.post('http://localhost:3001/api/getProdutoEsp', {
            pord: prod
        })
        .then(dat => this.setState({dataUsuarios: dat.data.data}));
    };
    render(){
        const { dataUsuarios } = this.state
        return(
            <div className="">
            {dataUsuarios.length <= 0
                ? <div><ProgressBar/></div>
                : 
                <div className="tudos">
                <div className="sideBar">
                <input type="text" placeholder="Pesquisar..."/>
                    <ul className="itemSideBar">
                        <li><NavLink to="/inicio/todos">TODOS</NavLink></li>
                        <li><NavLink to="/inicio/celular">CELULARES</NavLink></li> 
                        <li><NavLink to="/inicio/perifericos">PERIFÉRICOS</NavLink></li> 
                        <li><NavLink to="/inicio/computadores">COMPUTADORES</NavLink></li> 
                        <li><NavLink to="/inicio/consoles">CONSOLES</NavLink></li> 
                    </ul>
                </div>
                <ul className="ulItens" style={{display: 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center'}}>
                    {dataUsuarios.map((dat) => (
                        <li style={{}} className="center item"  key={dat._id}>
                            <Link  style={{ color: "black", height: 'auto', width: 270, margin: 0 }} key={dat._id} to={`/produto/${dat.titulo.replace(/ /g, "_")}`}>
                            <img style={{height: 300, width: 270}} src={dat.image} alt={dat.titulo}/>
                            <div className="center">
                            <div className="titulo" style={{ height: 'auto', width: 270}}>{dat.titulo.length < 30 ? dat.titulo : <div>{dat.titulo.substring(0, dat.titulo.length - (dat.titulo.length - 30))}...</div> }</div>
                            <div style={{ height: 'auto', width: 270}}>R$:{dat.preco}</div>
                            </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
                }
            </div>
        )
    }
}

export default Inicio