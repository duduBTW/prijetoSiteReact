import React, { Component } from 'react';
import {storage} from '../firebase/index'

class ImageUpload extends Component {
    state = {
        image: null,
        url: null
    }
    aoMudar = (e) => {
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
        }
    }
    aoEnviar = () => {
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image) // A primeira parte(ref) é o nome do arquivo, então eu vou colocar o nome do produto que a pessoa enviou
        uploadTask.on('state_changed', (snapshot) => {
            // Progresso

        }, (error) => {
            console.log(error)
        }, () =>{
            // Completo
            storage.ref('images').child(this.state.image.name).getDownloadURL().then(url => {
                console.log(url)
                this.setState({url})
            })
        })
    }
    render(){
        return(
            <div>
                <input type="file" onChange={this.aoMudar} />
                <button onClick={this.aoEnviar}>Adicionar</button>
                <img src={this.state.url || 'https://via.placeholder.com/150'} alt="Images enviadas"/>
            </div>
        )
    }
}

export default ImageUpload