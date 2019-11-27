import React, { Component } from 'react'
import axios from 'axios';
import { UsuarioContext } from '../context/UsuarioContext'
import '../css/styleEndereco.css'
import $ from 'jquery';
import M from "materialize-css";

export default class Endereco extends Component {

    static contextType = UsuarioContext

    state = {
        nomeDestinatario: '',
        estado: '',
        cep: '',
        bairro: '',
        numero: '',
        endereco: '',
        cidade: ''
    }

    componentDidMount() {

    }

    enderecoCep = (cep) => {

        let Correios = require('node-correios');
        let correios = new Correios();

        axios.get(`https://viacep.com.br/ws/${cep}/json`)
            .then(result => {
                const { bairro, logradouro, uf, localidade, erro } = result.data

                if (erro) {
                    M.Toast.dismissAll();
                    M.toast({ html: "Cep não encontrado, tente novamente", displayLength: 6000, classes: 'red darken-3' })
                } else {
                    this.setState({
                        endereco: logradouro,
                        bairro,
                        cidade: localidade,
                        estado: uf
                    })

                    $('#endereco').select();
                    $('#bairro').select();
                    $('#cidade').select();
                    $('#numero').select();
                    $('#estado').val(uf)
                }
            })
            .catch(error => {
                console.log(error)
            });

        // correios.consultaCEP({ cep: cep })
        //     .then(result => {
        //         const { bairro, logradouro, uf, localidade } = result

        //         this.setState({
        //             endereco: logradouro,
        //             bairro,
        //             cidade: localidade,
        //             estado: uf
        //         })


        //         $('#endereco').select();
        //         $('#bairro').select();
        //         $('#cidade').select();
        //         $('#numero').select();
        //         $('#estado').val(uf)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
    }

    aomudar = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    salvarEndereco = () => {
        const { nomeDestinatario, bairro, cep, cidade, endereco, estado, numero } = this.state
        const { email } = this.context
        if (!nomeDestinatario || !bairro || !cep || !cidade || !endereco || !numero) {
            M.Toast.dismissAll();
            M.toast({ html: "Todos os campos devem ser preenchidos", displayLength: 6000, classes: 'red darken-3' })
            console.log(this.state)
        } else {
            axios.post('https://restprojeto.herokuapp.com/api/updateEndereco', {
                nomeDestinatario, bairro, cep, cidade, endereco, estado, numero, email
            })
        }
    }

    render() {
        return (
            <div className="conteinerEndereco" >
                <div className="input-field">
                    <input
                        className="validate"
                        type="text"
                        name="nomeDestinatario"
                        id="nomeDestinatario"
                        onChange={this.aomudar}
                    />
                    <label className="active" for="nomeDestinatario">Nome do destinatario</label>
                </div>

                <div className="input-field">
                    <input type="text" name="cep" id="cep"
                        maxLength="8"
                        onChange={(e) => {
                            if (e.target.value.length >= 8) {
                                this.enderecoCep(e.target.value)
                                this.aomudar(e)
                            } else {
                                e.target.value = e.target.value.replace(/[^\d]/, '')
                            }
                        }}
                    />
                    <label className="active" for="cep">Cep * (somente os números)</label>
                </div>

                <div className="input-field">
                    <input
                        value={this.state.endereco}
                        className="validate"
                        type="text"
                        name="endereco"
                        id="endereco"
                        onChange={this.aomudar}
                    />
                    <label className="active" for="endereco">Endereço</label>
                </div>

                <div className="input-field">
                    <input
                        className="validate"
                        type="number"
                        name="numero"
                        id="numero"
                        onChange={this.aomudar}
                    />
                    <label className="active" for="numero">Numero *</label>
                </div>

                <div className="input-field">
                    <input
                        className="validate"
                        type="text"
                        name="bairro"
                        id="bairro"
                        onChange={this.aomudar}
                        value={this.state.bairro}
                    />
                    <label className="active" for="bairro">Bairro</label>
                </div>

                <div className="input-field">
                    <input
                        className="validate"
                        type="text"
                        name="cidade"
                        id="cidade"
                        onChange={this.aomudar}
                        value={this.state.cidade}
                    />
                    <label className="active" for="cidade">Cidade</label>
                </div>

                <select id='estado' name="estados-brasil"
                    style={{ display: "block" }}
                    onChange={(e) => {
                        if (e.target.value !== "default") {
                            this.setState({ estado: e.target.value })
                        }
                    }}>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    <label>Estado</label>
                </select>

                <div>
                    <button
                        style={{ margin: 20 }}
                        className="btn black"
                        onClick={this.salvarEndereco}
                    >
                        Salvar Endereço
                                </button>
                </div>
            </div>
        )
    }
}
