// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import AddTeste from './componentes/addTeste'
import Teste from './componentes/teste'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AdcProduto from './componentes/adcProduto';
import Nav from './componentes/nav';
import Inicio from './componentes/Inicio';
import InicioEsp from './componentes/InicioEsp';
import Registrar from './componentes/registrar';
import Login from './componentes/Login';
import Perfil from './componentes/perfil';
import Carrinho from './componentes/carrinho';
import ImageUpload from './componentes/ImageUpload';
import PaginaNaoEncontrada from './componentes/PaginaNaoEncontrada'
import Cartao from './componentes/creditCard'
import Produto from './componentes/produto'
import * as Cookies from 'es-cookie';
import MostrarCartao from './componentes/verCartao';
import UsuarioContextProvider from './componentes/context/UsuarioContext';
import Pesquisar from './componentes/Pesquisar';
import DataContextProvider from './componentes/context/DataContext';
var jwt = require('jsonwebtoken');

class App extends Component {
  // initialize our state
  state = {
    data: [],
    dataUsuarios: [],
    id: 0,
    intervalIsSet: false
  };

  componentDidMount() {
    this.getDataFromDb();
    var token = Cookies.get('token')
    if (token) {
      var decoded = jwt.verify(token, 'HifumiBestWaifu');
      const { email, nome } = decoded.user
      this.setState({
        email,
        nome
      })
    }
  }

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('https://restprojeto.herokuapp.com/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  }


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    axios.post('https://restprojeto.herokuapp.com/api/updateData', {
      id: idToUpdate,
      update: { message: updateToApply },
    });
  };

  render() {
    const { data, nome, email } = this.state;
    return (
      <UsuarioContextProvider>
        <DataContextProvider>
          <BrowserRouter>
            <Nav nome={nome} email={email} />
            <Switch>
              <Route exact path="/adcTeste" render={(props) => <AddTeste data={data} putDataToDB={this.putDataToDB} deleteFromDB={this.deleteFromDB}
                updateDB={this.updateDB}
              />} />
              <Route exact path="/teste" render={(props) => <Teste />} />
              <Route exact path="/" render={(props) => <Inicio {...props} data={this.state.data} />} />
              <Route path="/inicio/:filtro" render={(props, match) => <InicioEsp data={this.state.data} {...props} />} />
              <Route exact path="/adicionar" render={(props) => <AdcProduto {...props} adcProdToDB={this.adcProdToDB} />} />
              <Route exact path="/pesquisar" render={(props) => <Pesquisar {...props} data={this.state.data} />} />
              <Route exact path="/registrar" render={(props) => <Registrar {...props} />} />
              <Route exact path="/card" render={(props) => <Cartao {...props} email={email} />} />
              <Route exact path="/entrar" render={(props) => <Login {...props} />} />
              <Route exact path="/addImage" render={(props) => <ImageUpload {...props} />} />
              <Route exact path="/carrinho" render={(props) => <Carrinho {...props} />} />
              <Route path="/perfil" render={(props) => <Perfil {...props} />} />
              <Route path="/perfil/card" render={(props) => <Cartao {...props} email={email} />} />
              <Route path="/perfil/verCartao" render={(props) => <MostrarCartao {...props} />} />
              <Route path="/produto/:datTitulo" render={(props) => <Produto {...props} data={data} />} />
              <Route component={PaginaNaoEncontrada} />
            </Switch>
          </BrowserRouter>
        </DataContextProvider>
      </UsuarioContextProvider>
    );
  }
}

export default App;