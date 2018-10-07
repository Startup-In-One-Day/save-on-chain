import React from 'react';
import {Elements} from 'react-stripe-elements';

import MyStoreCheckout from './MyStoreCheckout'

class StripeButton extends React.Component {
    render() {
        return (
            <Elements>
                <MyStoreCheckout />
            </Elements>
        );
    }
}

export default StripeButton;