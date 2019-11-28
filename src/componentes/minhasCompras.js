import React, { Component } from 'react'
import axios from 'axios'
import { UsuarioContext } from './context/UsuarioContext'

export default class MinhasCompras extends Component {

    static contextType = UsuarioContext

    state = {
        pedidos: null
    }

    componentDidMount() {
        if (this.context.email !== null && this.context.email !== undefined && this.state.pedidos === null) {
            axios.post('http://localhost:3001/api/getCompras', { email: this.context.email })
                .then(result => {
                    console.log(result)
                    this.setState({ pedidos: result.data.data })
                })
        }
    }

    componentWillReceiveProps() {
        if (this.context.email !== null && this.context.email !== undefined && this.state.pedidos === null) {
            axios.post('http://localhost:3001/api/getCompras', { email: this.context.email })
                .then(result => {
                    console.log(result)
                    this.setState({ pedidos: result.data.data })
                })
        }
    }

    render() {
        const { pedidos } = this.state
        return (
            <div>
                <h3 className="center">Pedidos</h3>
                {(pedidos !== null && pedidos !== undefined) ? (
                    pedidos.map(pedido => (
                        <div className="card" data-aos-duration="270" data-aos="fade-up" data-aos-easing="ease-out-cubic" data-aos-anchor-placement="top-bottom" style={{ minHeight: "220px", padding: "10px" }}>
                            <h3>{pedido.titulo}</h3>
                            <h2 className="green-text">R$: {pedido.preco}</h2>
                            <h4>Quantidade: {pedido.quantidade} </h4>
                        </div>
                    ))
                ) : null
                }
            </div>
        )
    }
}
