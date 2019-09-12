import React, { Component } from 'react';

class Produtos extends Component {
  state = {
    item: '',
    preco: ''
  }

  aoMudarAdcProduto = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  teste = (e) =>{
    e.preventDefault()
    if ((this.state.item !== '') && (this.state.preco !== '')) {
      this.props.colocarProduto(this.state)
      document.getElementById('item').value = ''
      document.getElementById('preco').value = ''
      this.setState({
        item: '',
        preco: ''
      })
    } else {
      alert('Ambos os campos devem ser preenchidos')
    }
  }

  render(){
    const {itens, comprar, esseUsuario, removerProduto} =this.props
    const listaItens = itens.map(produto => {
      return(
        <div className="itens-conteiner" key={produto.id} >
          {esseUsuario === null ? null : <div>{esseUsuario.tipo === 'Administrador' ? <button onClick={() => {removerProduto(produto.id)} } className="btn red">X</button> : null}</div>}
          <div className="t"> Item: {produto.item} </div>
          <div className="t"> Preço: {produto.preco} </div>
          <button onClick={() => {comprar(produto)}} className="btn">Comprar</button>
        </div>
      )
    })
    
    if(esseUsuario === null){
      return (
        <div>
          <div>{ listaItens }</div>
        </div>
      )
    } else if (esseUsuario.tipo === 'Administrador'){
      return(
        <div>
          <div>{ listaItens }</div>
          <form className="center conterinet-adcProduto" onSubmit={this.teste}>
            <input onChange={ this.aoMudarAdcProduto } placeholder="Produto..." id="item" type="text"/>
            <input onChange={ this.aoMudarAdcProduto } placeholder="Preço..." id="preco" type="number"/>
            <button className="btn center">Adicionar</button>
          </form>
        </div>
      )
    } 
    else {
      return (
        <div>
          <div>{ listaItens }</div>
        </div>
      )
    }
  }
}
export default Produtos;