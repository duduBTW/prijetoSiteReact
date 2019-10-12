import React, { useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";
import axios from 'axios';
import Item from './partes/Item'
import DataContextProvider, { DataContext } from './context/DataContext';

export default function Pesquisar() {

    const [pesquisar, setPesquisar] = useState("");
    const [itens, setItens] = useState("");
    const [produtos, setProdutos] = useState(null);
    const [erro, setErro] = useState(null);

    const enviarPesquisar = (e) => {
        e.preventDefault();

        const url = new URL('http://localhost:3001/api/pesquisar')
        const parametros = { nome: pesquisar }
        url.search = new URLSearchParams(parametros)

        axios.get(url)
            .then(resposta => {
                if (resposta.data.success === true) {
                    setProdutos(resposta.data.data)
                    setErro(null)
                } else {
                    setErro("Produto não encontrado")
                    setProdutos(null)
                }
            })
    };

    return (
        <DataContext.Consumer>{(dataContext) => {
            const { data } = dataContext

            let pog = "";
            if (itens === "" && data !== null) {
                data.map(dat => {
                    const item = `"${dat.titulo}": "${dat.image}",`
                    pog += item
                });
                pog = eval('({' + pog + '})');
                setItens(pog)
            }
            return (
                <div className="input-field">
                    <form onSubmit={enviarPesquisar}>
                        <input
                            style={{
                                background: "rgba(218, 218, 218, 0.171)",
                                padding: 10,
                                margin: 10,
                                width: '90vw'
                            }}
                            required
                            id="autocomplete-input"
                            className="autocomplete validate"
                            type="text"
                            placeholder="Pesquisar..."
                            onChange={(e) => {
                                setPesquisar(e.target.value)
                                var elems = document.querySelectorAll('.autocomplete');
                                M.Autocomplete.init(elems, {
                                    data: itens,
                                    minLength: 3,
                                    onAutocomplete(txt) {
                                        setPesquisar(txt)
                                    }
                                });
                            }}
                        />
                        <button
                            className="btn btn-large btn-floating black white-text pesquisarBtn"
                            type="submit">
                            <i style={{ marginLeft: 2 }} class="material-icons">send</i>
                        </button>
                        {/* <input type="submit" value="Envia" className="btn" /> */}
                    </form>
                    {produtos !== null ?
                        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center" }}>
                            {produtos.map((dat) => (
                                <Item key={dat._id} data={dat} />
                            ))}
                        </div>

                        :

                        <div style={{ marginTop: "20vh" }}>
                            {erro !== "Produto não encontrado" ?
                                <h4 className="grey-text center">Pesquise por um produto</h4>
                                :
                                <div>
                                    <h4 className="red-text center">{erro}</h4>
                                    <div className="center grey-text">
                                        <h5>O que eu faço?</h5>
                                        <div>- Verifique os termos digitados ou os filtros selecionados.</div>
                                        <div>- Utilize termos genéricos na busca.</div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            )
        }}
        </DataContext.Consumer>
    )
}
