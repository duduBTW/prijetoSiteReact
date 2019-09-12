import React, { Component } from 'react';

class AddTeste extends Component {
    state = {
        id: 0,
        message: null,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null
    }
    render(){
    const { data, putDataToDB, deleteFromDB, updateDB } = this.props;
        return(
        <div>
            <ul>
            {data.length <= 0
                ? 'NO DB ENTRIES YET'
                : data.map((dat) => (
                    <li style={{ padding: '10px' }} key={data.message}>
                    <span style={{ color: 'gray' }}> id: </span> {dat.titulo} <br />
                    <span style={{ color: 'gray' }}> preco: </span> {dat.preco} <br />
                    <span style={{ color: 'gray' }}> data: </span>
                    {dat.message}
                    <div style={{ padding: '10px' }}>
                    <button onClick={() => deleteFromDB(dat._id)}>
                        DELETAR
                    </button>

                    <button
                    onClick={() =>
                    updateDB(dat._id, this.state.updateToApply)
                    }
                    >
                    UPDATE
                    </button>  
                    <input
                type="text"
                style={{ width: '200px' }}
                onChange={(e) => this.setState({ updateToApply: e.target.value })}
                placeholder="put new value of the item here"
            />
            </div>
            
                    </li>
                    
                ))}
            </ul>
            <div style={{ padding: '10px' }}>
            <input
                type="text"
                onChange={(e) => this.setState({ message: e.target.value })}
                placeholder="add something in the database"
                style={{ width: '200px' }}
            />
            <button onClick={() => putDataToDB(this.state.message)}>
                ADD
            </button>
            </div>
            
            <div style={{ padding: '10px' }}>
            
            </div>
        </div>
        )
    }
}


export default AddTeste;