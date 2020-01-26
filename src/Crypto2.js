import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';

const Crypto = () => {

    const [crypto, setCrypto] = useState([]);

    useEffect(() => {
        getData();
        setInterval(getData, 5000);
    }, []);
    
    

    const getData = () => {
        console.log('5 seksund');
        console.log(state);
        axios.get('https://blockchain.info/pl/ticker')
        .then(response => {
            const cryptoData = response.data;
            let cryptoArray = [];
            let color = 'blue';
            for(let key in cryptoData) {
                // console.log(crypto);
                // if(cryptoData[key].last > crypto){
                //     color = 'green'
                //     console.log('mniejsza')
                // }
                // if (cryptoData[key].last ) {
                //     color = 'red'
                //     console.log('wieksza')
                // }
                // if (cryptoData[key].last ) {
                //     console.log('te same')
                // }
                let cryptoObject = {
                    last: cryptoData[key].last,
                    symbol: cryptoData[key].symbol,
                    currency: key,
                    colorClass: color
                }
                cryptoArray.push(cryptoObject);
            }
            setCrypto(cryptoArray);
        })
    }
    
    return (
        <div className='crypto'>
            <h1>Crypto rate</h1>
            <CryptoList data={crypto}/>
        </div>
    )
}

export default Crypto;