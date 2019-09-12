import React, { Component } from 'react';

class Fundos extends Component {
    render(){
        const {dinheiro} = this.props
        return(
            <div className="dinheiro">
                <div>  {dinheiro} </div>
            </div>
        )
    }
}

export default Fundos;