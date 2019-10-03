import React, { Component } from 'react';
import {  ProgressBar } from 'react-materialize';
import {  Link  } from 'react-router-dom'
import { storage } from '../firebase/index'
import './css/styleProduto.css'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import axios from 'axios';
import * as Cookies from 'es-cookie';

import Item from './partes/Item'

var jwt = require('jsonwebtoken');

class Produto extends Component{
    state = { 
        produto: null,
        titulo: null,
        itensHistorico: null,
        nome: null,
        email: null
    }
    componentWillReceiveProps(props){
        window.scrollTo(0, 0);
        const a = props.match.params.datTitulo.replace(/_/g, " ")
        const produto = props.data.find(dat => dat.titulo === a)
        if(produto !== null && produto !== undefined){
            this.setState({produto})
            this.setState({titulo: produto.titulo})
        }
        if(produto !== undefined) {
            this.addHistorico(produto)
        }
    }
    componentDidMount = () =>{
        window.scrollTo(0, 0);
        if(this.props.data.length !== 0){
            const a = this.props.match.params.datTitulo.replace(/_/g, " ")
            const produto = this.props.data.find(dat => dat.titulo === a)
            if(produto !== null && produto !== undefined){
                this.setState({produto})
                this.setState({titulo: produto.titulo})
            }
            if(produto !== undefined) {
                this.addHistorico(produto)
            }
        }

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

    addHistorico = (produto) => {
        // Descobrir se existem Cookies
        let historico = Cookies.get('historico')
        if(!historico){
            // Se o historico estiver vazio cria um array com o item
            const historicoBase = [produto];
            const historico = jwt.sign({ historicoBase }, 'HifumiBestWaifu');
            Cookies.set('historico', historico);
        } else {
            // Se o historico estiver vazio cria verifica se o item já existe
            var decoded = jwt.verify(historico, 'HifumiBestWaifu');
            this.setState({itensHistorico: decoded})
            const historicoIgual = decoded.historicoBase.find(item => item.titulo === produto.titulo)
            
            if (!historicoIgual){
                if(decoded.historicoBase.length >= 6){
                    decoded.historicoBase.splice(0, 1)
                }
                // Se não existir adiciona no cookie
                const historicoBase = [...decoded.historicoBase, produto];
                const historico = jwt.sign({ historicoBase }, 'HifumiBestWaifu');
                
                Cookies.set('historico', historico);
            }
        }
    }

    addCarrinho = () =>{
        // Meu deus esse codigo está caotico... what have I done
        const produto = Cookies.get('produto')
        if(!produto){
            this.state.produto.quantidade = 1
            const produtoBase = [this.state.produto];
            const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
            Cookies.set('produto', produto);
            this.props.history.push('/carrinho');
        } else {
            const produtoInicio = this.state.produto;
            const produtoo = Cookies.get('produto')
            var decoded = jwt.verify(produtoo, 'HifumiBestWaifu');

            const produtoIgual = decoded.produtoBase.find(item => item.titulo === produtoInicio.titulo)
            if(produtoIgual){
                let produtoBase = decoded.produtoBase.filter(item => item.titulo !== produtoIgual.titulo)
                produtoIgual.quantidade = ++produtoIgual.quantidade
                produtoBase = [...produtoBase, produtoIgual]

                const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
                Cookies.set('produto', produto);
                this.props.history.push('/carrinho');
            } else {
                produtoInicio.quantidade = 1
                const produtoBase = [...decoded.produtoBase, produtoInicio]
                const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
                Cookies.set('produto', produto);
                this.props.history.push('/carrinho');
            }
        }
    }

    comprarBoleto = () =>{
        axios.post('http://localhost:3001/api/gerarBoleto', {
            nome: `${this.state.nome}`,
            titulo: `${this.state.produto.titulo.replace(/ /g, "_")}`,
            preco: this.state.produto.preco,
        }).then(res => {
            // create the blob object with content-type "application/pdf"               
            var blob = new Blob( [res], { type: "application/pdf" });
            console.log(res)
            const uploadTask = storage.ref(`images/testePoggg55`).put(blob) // A primeira parte(ref) é o nome do arquivo, então eu vou colocar o nome do produto que a pessoa enviou
            uploadTask.on('state_changed', (snapshot) => {
                // Progresso
            }, (error) => {
                console.log(error)
            }, () => {
                // Completo
                // storage.ref('images').child(titulo).getDownloadURL().then(url => {
                    
                        
                //     })
                console.log(':)')
                })
            })
            // window.open(`http://localhost:3001/${this.state.produto.titulo.replace(/ /g, "_")}.pdf`,'_blank')
        }

    render(){
        return(
            <div> 
                {this.state.produto !== null ? (
                   <div style={{display: 'flex', flexDirection: 'column'}} >
                        <div className="produto">
                            <div style={{width: 518}} className="img center" onLoad={() => {
                                var elems = document.querySelectorAll('.materialboxed');
                                var instances = M.Materialbox.init(elems);
                            }}>
                                <img data-caption={this.state.produto.titulo} className="materialboxed" style={{width: 518}} src={this.state.produto.image}/>
                            </div>
                            <div className="infos">
                                <h3>{this.state.produto !== null ? this.state.produto.titulo : <div>Carregando...</div> }</h3>
                                <h4>{this.state.produto !== null ? <div><span className="grey-text">Preço:</span> <span className="green-text">R$:{this.state.produto.preco}</span></div> : null}</h4>
                            </div>
                            <div className="comprar">
                                <button onClick={this.comprarBoleto} className="btn black waves-effect waves-green">Comprar Agora</button>
                                <button onClick={this.addCarrinho} className="btn black waves-effect waves-green">Adicionar ao carrinho</button>
                            </div>
                            {  
                            }
                        </div>
                        <div>
                            {this.state.itensHistorico !== null ? 
                            <div>
                                <h4 className="center" style={{padding: 40}}>Historico</h4>
                                <ul className="ulItens" style={{display: 'flex', 'flexFlow': 'row wrap', 'justifyContent': 'center'}}>
                                    {this.state.itensHistorico.historicoBase.map((dat) => (
                                        <Item key={dat._id} data={dat}/>
                                    ))
                                    }
                                </ul> 
                            </div>
                            : null}
                            </div>
                   </div>
                ) : (
                    <ProgressBar/>
                ) }
            </div>
        )
    }
}

export default Produto