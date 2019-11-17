import React, { createContext, Component } from 'react'
import * as Cookies from 'es-cookie';

const jwt = require('jsonwebtoken');

export const CarrinhoContext = createContext();

class CarrinhoContextProvider extends Component {
    state = {
        itensCarrinho: null,
        precoTotal: 0,
        itemTotal: 0,
        itemRemovido: null
    }

    componentDidMount = () => {
        const produto = Cookies.get('produto')
        if (produto) {
            const produtoo = Cookies.get('produto')
            var decodedProduto = jwt.verify(produtoo, 'HifumiBestWaifu');
            this.setState({ itensCarrinho: decodedProduto.produtoBase })

            // Faz a soma do preço total do produto
            decodedProduto.produtoBase.forEach(element => {
                this.setState({
                    precoTotal: this.state.precoTotal += (element.preco * element.quantidade)
                })
            });

            // Faz a soma da quantidade de itens
            let itemTotal = 0
            decodedProduto.produtoBase.forEach(item => itemTotal = itemTotal + item.quantidade)
            this.setState({ itemTotal })

        }
    }

    addCarrinho = (produtoState) => {
        // Meu deus esse codigo está caotico... what have I done
        const produto = Cookies.get('produto')
        if (!produto) {
            produtoState.quantidade = 1
            const produtoBase = [produtoState];
            const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
            Cookies.set('produto', produto);
            this.setState({
                itensCarrinho: produtoBase,
                precoTotal: this.state.precoTotal + produtoState.preco,
                itemTotal: ++this.state.itemTotal
            })
        } else {
            const produtoInicio = produtoState;
            const produtoo = Cookies.get('produto')
            var decoded = jwt.verify(produtoo, 'HifumiBestWaifu');

            const produtoIgual = decoded.produtoBase.find(item => item.titulo === produtoInicio.titulo)
            if (produtoIgual) {
                let produtoBase = decoded.produtoBase.filter(item => item.titulo !== produtoIgual.titulo)
                produtoIgual.quantidade = ++produtoIgual.quantidade
                produtoBase = [...produtoBase, produtoIgual]

                const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
                Cookies.set('produto', produto);

                this.setState({
                    itensCarrinho: produtoBase,
                    precoTotal: this.state.precoTotal + produtoState.preco,
                    itemTotal: ++this.state.itemTotal
                })
            } else {
                produtoInicio.quantidade = 1
                const produtoBase = [...decoded.produtoBase, produtoInicio]
                const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
                Cookies.set('produto', produto);

                this.setState({
                    itensCarrinho: produtoBase,
                    precoTotal: this.state.precoTotal + produtoState.preco,
                    itemTotal: ++this.state.itemTotal
                })
            }
        }
    }

    removerItem = (itemRemover) => {
        const produtoBase = this.state.itensCarrinho.filter(item => item.titulo !== itemRemover)
        this.setState({ itensCarrinho: produtoBase })
        const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
        Cookies.set('produto', produto);

        const itemParaRemover = this.state.itensCarrinho.find(item => item.titulo === itemRemover);
        this.setState({
            precoTotal: this.state.precoTotal - (itemParaRemover.preco * itemParaRemover.quantidade),
            itemTotal: this.state.itemTotal - itemParaRemover.quantidade,
            itemRemovido: itemParaRemover
        })
    }

    mudarQuantidade = (addOrRem, titulo, preco) => {
        const produtoInicio = this.state.itensCarrinho.find(produto => produto.titulo === titulo)
        let produtoBase = this.state.itensCarrinho.filter(produto => produto.titulo !== titulo)

        if (addOrRem === 'adicionar') {
            produtoInicio.quantidade = ++produtoInicio.quantidade
            this.setState({
                precoTotal: this.state.precoTotal + preco,
                itemTotal: ++this.state.itemTotal
            })
        } else if (addOrRem === 'remover') {
            produtoInicio.quantidade = --produtoInicio.quantidade
            this.setState({
                precoTotal: this.state.precoTotal - preco,
                itemTotal: --this.state.itemTotal
            })
        }
        produtoBase = [produtoInicio, ...produtoBase]

        const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
        Cookies.set('produto', produto);
    }

    desfazer = () => {
        const { itemRemovido, itensCarrinho } = this.state
        const produtoBase = [...itensCarrinho, itemRemovido]
        this.setState({ itensCarrinho: produtoBase })
        const produto = jwt.sign({ produtoBase }, 'HifumiBestWaifu');
        Cookies.set('produto', produto);

        this.setState({
            precoTotal: this.state.precoTotal + (itemRemovido.preco * itemRemovido.quantidade),
            itemTotal: this.state.itemTotal + itemRemovido.quantidade,
            itemRemovido: null
        })
    }

    removerAba = () => {
        this.setState({ itemRemovido: null })
    }

    render() {
        return (
            <CarrinhoContext.Provider
                value={{
                    ...this.state,
                    desfazer: this.desfazer,
                    mudarQuantidade: this.mudarQuantidade,
                    removerItem: this.removerItem,
                    removerAba: this.removerAba,
                    addCarrinho: this.addCarrinho
                }}
            >
                {this.props.children}
            </CarrinhoContext.Provider>
        )
    }
}

export default CarrinhoContextProvider