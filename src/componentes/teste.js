import React, {Component} from 'react';
import { storage } from '../firebase/index'

class Teste extends Component {
    aaa = () =>{
        fetch('http://localhost:3001/api/gerarBoleto')
            .then((data) => data.json())
            .then((res) => {
                var file = new Blob([res.success], {type: 'application/pdf'});
                const uploadTask = storage.ref(`images/testePoggg`).put(file) // A primeira parte(ref) é o nome do arquivo, então eu vou colocar o nome do produto que a pessoa enviou
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
            });
    } 
    render(){
        return(
            <div>
            <button onClick={this.aaa} className="btn">Teste</button>
            <img class="materialboxed" width="650" src="https://cdn.myanimelist.net/images/characters/8/306604.jpg"></img>
            </div>
        )
    }
}

export default Teste;