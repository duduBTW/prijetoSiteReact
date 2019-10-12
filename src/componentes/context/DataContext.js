import React, { createContext, Component } from 'react';

export const DataContext = createContext();

class DataContextProvider extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        fetch('https://restprojeto.herokuapp.com/api/getData')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }));
    }

    render() {
        return (
            <DataContext.Provider value={{ ...this.state, addProp: this.addProp }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default DataContextProvider