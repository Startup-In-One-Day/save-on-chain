import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUNISHABLE from '../../constants/stripe';
import PAYMENT_SERVER_URL from '../../constants/server';

const CURRENCY = 'CAD';

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Successful');
};

const errorPayment = data => {
    alert('Payment Error');
};

const onToken = (amount, description, hash, message) => token => {
    console.log(token);
    axios.post(PAYMENT_SERVER_URL, 
        {
            stripeToken: token.id,
            stripeTokenType: 'card',
            stripeEmail: token.email, 
            currency: CURRENCY,
            amount: fromDollarToCent(amount),
            hash: hash,
            message: message
        })
        .then(success => {
            console.log('**** yay' + success);
        })
        .catch(errorPayment);
    }

const Checkout = ({ name, description, amount, hash, message }) =>
    <StripeCheckout
        name={name}
        description={description}
        amount={fromDollarToCent(amount)}
        token={onToken(amount, description, hash, message)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUNISHABLE}
    />

export default Checkout;