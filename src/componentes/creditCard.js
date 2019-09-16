import React from 'react';
import Card from 'react-credit-cards';
import axios from 'axios';
import Swal from 'sweetalert2'

import 'react-credit-cards/es/styles-compiled.css';
import './css/styleCard.css'

import * as Cookies from 'es-cookie';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './things/utils';
var jwt = require('jsonwebtoken');

export default class Cartao extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  };

  componentDidMount(){
      let token = Cookies.get('token')
      if (!token){
        this.props.history.push('/entrar');
      }
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
      axios.post('https://restprojeto.herokuapp.com/api/putCard', {
        formData,
        email: this.props.email
      })
      .then((resultado) => {
        const user = resultado.data.data
        const token = jwt.sign({ user }, 'HifumiBestWaifu');
        Cookies.set('token', token);
        Swal.fire({
          type: 'success',
          title: 'Dados adicionados com sucesso'
        })
        .then((result) => {
            if(result){
              this.props.history.push('/perfil/verCartao');
            }
        })
      }
    )
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment" className="all">
        <div className="App-payment">
          <Card
            onClick=""
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Número do cartão..."
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <label>E.g.: 49, 51, 36, 37, 60, 5066 99, 62 </label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nome..."
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Validade..."
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="Codigo de sergurança..."
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions enviar">
              <button className="btn black btn-block">Enviar informações</button>
            </div>
          </form>
          <h3>{formData !== null ? <div>Nome: {formData.name}</div>  : null}</h3>
          <h3>{formData !== null ? <div>Numero: {formData.number}</div> : null}</h3>
          <h3>{formData !== null ? <div>Codigo de segurança: {formData.cvc}</div> : null}</h3>
          
        </div>
      </div>
    );
  }
}

