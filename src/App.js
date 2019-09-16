// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import AddTeste from './componentes/addTeste'
import Teste from './componentes/teste'
import { BrowserRouter, Route, Redirect  } from 'react-router-dom'
import AdcProduto from './componentes/adcProduto';
import Nav from './componentes/nav';
import Inicio from './componentes/Inicio';
import Registrar from './componentes/registrar';
import Login from './componentes/Login';
import Perfil from './componentes/perfil';
import Carrinho from './componentes/carrinho';
import ImageUpload from './componentes/ImageUpload';
import Cartao from './componentes/creditCard'
import Produto from './componentes/produto'
import * as Cookies from 'es-cookie';
import MostrarCartao from './componentes/verCartao';
var jwt = require('jsonwebtoken');

class App extends Component {
  // initialize our state
  state = {
    data: [],
    dataUsuarios: [],
    id: 0,
    intervalIsSet: false,
    email: null,
    nome: null
  };

  componentDidMount() {
    this.getDataFromDb();
    var token = Cookies.get('token')
      if (token){
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
  };
  // our first get method that uses our backend api to
  // fetch data from our data base
  getProdutosFromDb = () => {
    fetch('https://restprojeto.herokuapp.com/api/getProdutos')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('https://restprojeto.herokuapp.com/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // adcProdToDB = (titulo, preco) => {
  //   axios.post('https://restprojeto.herokuapp.com/api/putProd', {
  //     titulo,
  //     preco
  //   });
  // };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    axios.delete('https://restprojeto.herokuapp.com/api/deleteData', {
      data: {
        id: idTodelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    axios.post('https://restprojeto.herokuapp.com/api/updateData', {
      id: idToUpdate,
      update: { message: updateToApply },
    });
  };

  addProp = (email, nome) =>{
    this.setState({nome, email})
  }
  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  acharDados = () =>{
    console.log('a')
  }
  render() {
    const { data, nome, email } = this.state;
    return (
      <BrowserRouter>
      <Nav nome={nome} email={email} />
        <Route exact path="/adcTeste" render={(props) => <AddTeste data={data} putDataToDB={this.putDataToDB} deleteFromDB={this.deleteFromDB} 
        updateDB={this.updateDB}
        />} />         
        <Route exact path="/teste" render={(props) => <Teste />} />         
        <Route exact path="/" render={(props) => <Inicio />} />         
        <Route path="/inicio/:filtro" render={(props) => <Inicio {...props} />} />       
        <Route exact path="/adicionar" render={(props) => <AdcProduto {...props} adcProdToDB={this.adcProdToDB} />} />         
        <Route exact path="/registrar" render={(props) => <Registrar {...props} />} />         
        <Route exact path="/card" render={(props) => <Cartao {...props} email={email} />} />         
        <Route exact path="/entrar" render={(props) => <Login {...props}  />} />         
        <Route exact path="/addImage" render={(props) => <ImageUpload {...props}  />} />  
        <Route exact path="/carrinho" render={(props) => <Carrinho {...props}  />} />  
        <Route path="/perfil" render={(props) => <Perfil {...props} addProp={this.addProp} />} />   
        <Route path="/perfil/card" render={(props) => <Cartao {...props} email={email} />} />        
        <Route path="/perfil/verCartao" render={(props) => <MostrarCartao {...props}  />} />    
        <Route path="/produto/:datTitulo" render={(props) => <Produto {...props} data={data} />}/> 
      </BrowserRouter>
    );
  }
}

export default App;