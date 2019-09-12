import React, { Component } from 'react';
import axios from 'axios';
import {storage} from '../firebase/index'
import Swal from 'sweetalert2'
import './css/styleAdd.css'
import {  ProgressBar } from 'react-materialize';

class AdcProduto extends Component {
    state = {
        titulo: null,
        preco: 0,
        image: null,
        url: null,
        tipo: null,
        progresso: 0
    }
    adcProdToDB = (titulo, preco, tipo, url) => {
        const uploadTask = storage.ref(`images/${titulo}`).put(this.state.image) // A primeira parte(ref) é o nome do arquivo, então eu vou colocar o nome do produto que a pessoa enviou
        uploadTask.on('state_changed', (snapshot) => {
            // Progresso
            const progresso = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progresso})
        }, (error) => {
            console.log(error)
        }, () =>{
            // Completo
            storage.ref('images').child(titulo).getDownloadURL().then(url => {
                axios.post('http://localhost:3001/api/putProd', {
                    titulo,
                    preco,
                    tipo,
                    url
                });
                Swal.fire({
                    type: 'success',
                    title: 'Produto adicionado'
                })
                .then((result) => {
                    if(result){
                        window.location.href = `${__dirname}`
                    }
                })
            })
        })
        
    };
    aoMudar = (e) => {
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
        }
    }
    render(){
        const {titulo, preco, tipo} = this.state
        return(
           <div className="conteiner-login">
                 <form action='/' onSubmit={ (e) => {e.preventDefault()}} className="adc">
                    <h3 className="center">Adicionar Produto</h3>
                    <input type="text" name="titulo" id="titulo" placeholder="Nome..." onChange={(e)=> this.setState({[e.target.id]: e.target.value})}/>
                    <input type="number" name="preco" id="preco" placeholder="Preço..." onChange={(e)=> this.setState({[e.target.id]: e.target.value})}/>
                    <select style={{display: 'block'}} onChange={e => {this.setState({ tipo: e.target.value })}}>
                        <option value="celular">Celular</option>
                        <option value="perifericos">Periferico</option>
                        <option value="computadores">Computador</option>
                        <option value="consoles">Console</option>
                    </select>
                    <div>
                        <input 
                        accept=".png, .jpg, .jpeg, .gif"
                        style={{display: 'none'}} 
                        type="file" 
                        onChange={this.aoMudar} 
                        ref={fileInput => this.fileInput = fileInput}
                        />
                        <button style={{marginTop: 20}} className="btn center black" onClick={() => this.fileInput.click()}>Escolher Arquivo</button>
                    </div>
                    {this.state.progresso > 0 ? <ProgressBar progress={this.state.progresso} /> : null}
                    <div className="center botoes"> 
                        <button style={{marginTop: 20}} className="btn center black" type="submit" onClick={()=> this.adcProdToDB(titulo, preco, tipo)}>Adicionar</button>
                    </div>
                </form> 
            </div>
        )
    }
}

export default AdcProduto;