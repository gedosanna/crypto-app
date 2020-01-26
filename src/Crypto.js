import React, { Component } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor() {
        super();
        this.state = {
            crypto: [],
            filteredCrypto: []
        }
    }
    componentDidMount() {
        this.getData();
        this.timer = setInterval(this.getData, 5000);
    }

    getData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(response => {
                const cryptoData = response.data;
                let cryptoArray = [];
                let color = 'blue';
                let i = 0;
                for (let key in cryptoData) {
                    let prevCryptoValue = this.state.crypto[i];
                    if (prevCryptoValue !== undefined) {
                        if(cryptoData[key].last > prevCryptoValue.last){
                            color = 'green'
                        }
                        else if (cryptoData[key].last < prevCryptoValue.last) {
                            color = 'red'
                        }
                        else{
                        }
                    }
                    
                    let cryptoObject = {
                        last: cryptoData[key].last,
                        symbol: cryptoData[key].symbol,
                        currency: key,
                        colorClass: color
                    }
                    cryptoArray.push(cryptoObject);
                    i++;
                }
                this.setState({ crypto: cryptoArray, filteredCrypto: cryptoArray });
                this.filterCrypto();
            })
    }

    filterCrypto = event => {
        let filteredCryptoData = this.state.crypto.filter(cryptoElement => {
            return cryptoElement.currency.toUpperCase().includes(this.filterInput.value.toUpperCase());
        })
        this.setState({filteredCrypto: filteredCryptoData});
    }

    render() {
        console.log(this.filterInput);
        return (
            <div className='crypto'>
                <h1>Crypto rate</h1>
                <input onChange={this.filterCrypto} ref={input => this.filterInput = input}></input>
                <CryptoList data={this.state.filteredCrypto} />
            </div>
        )
    }

}

export default Crypto;