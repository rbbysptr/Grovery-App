// CurrencyFormatComponent.jsx
import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default function CurrencyFormatComponent({ value }) {
    return (
        <CurrencyFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp'}
        />
    );
}
