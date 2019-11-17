import React from 'react';
import Card from 'react-credit-cards';
import * as Cookies from 'es-cookie';
import { Link } from 'react-router-dom'

import 'react-credit-cards/es/styles-compiled.css';

var jwt = require('jsonwebtoken');

export default class MostrarCartao extends React.Component {
  state = {
    numero: null,
    nome: null,
    expiry: '',
    cvc: 0
  };
  componentDidMount() {
    // Ler Token
    var token = Cookies.get('token')
    if (token) {
      var decoded = jwt.verify(token, 'HifumiBestWaifu');
      const { cartao } = decoded.user
      if (cartao !== undefined) {
        this.setState({
          // numero: cartao.numero.replace(/^.{14}/g, '0000 0000 0000'),
          numero: cartao.numero.substring(0, cartao.numero.length - (cartao.numero.length - 4)),
          nome: cartao.nome
        })
      }
    } else {
      this.props.history.push('/entrar');
    }
  }
  render() {
    const { numero, nome, cvc, expiry } = this.state

    return (
      <div key="Payment">
        <div className="App-payment">
          {numero !== null && numero !== undefined ?
            <div className="center" style={{ marginTop: "4%" }}>
              <h4 style={{ margin: 20 }}>Seu cartão</h4>
              <Card
                number={numero}
                name={nome}
                expiry={expiry}
                cvc={cvc}
              />
              {/* <Link to={'/card'} style={{margin: 20}} className="btn black">Editar</Link> */}
            </div>
            : null}
        </div>
      </div>
    );
  }
}

