import React, { Component } from 'react';
import { storage } from '../firebase/index'
import axios from 'axios';

class Teste extends Component {
    aaa = () => {
        axios.get('https://simplescraper.io/api/EnK6UYgCd2LSGDSQQcWd?apikey=HxVreeY76A1M5vNHzi76vHgEqA9yVgpR&offset=0&limit=100', {
            nome: "Teste"
        }).then(res => console.log(res))
    }
    render() {
        return (
            <div>
                <button onClick={this.aaa} className="btn">Teste</button>
                <img class="materialboxed" width="650" src="https://cdn.myanimelist.net/images/characters/8/306604.jpg"></img>
            </div>
        )
    }
}

export default Teste;