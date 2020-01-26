import React from 'react';

const CryptoList = props => {
    let rates = props.data.map((element) => {
        return (
            <ul key={element.currency} className='rate'>
                <li>Last rate:</li>
                <li className={element.colorClass}>{element.last} </li>
                <li>{element.currency}</li>
                <li>[{element.symbol}]</li>
            </ul>
        )
    })
    return (
        <div className='crypto-list'>
            {rates}
        </div>
    )
}

export default CryptoList;