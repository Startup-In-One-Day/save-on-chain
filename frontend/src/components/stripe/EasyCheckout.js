import React from 'react';
import constants from '../../constants/stripe';
import './Stripe.css';

class EasyCheckoutForm extends React.Component {

    render() {
        return (
            <form action="localhost:3000/api/charge" method="POST">
                <script
                    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                    data-key={constants.STRIPE_PUBLISHABLE}
                    data-amount="999"
                    data-name="proof-of-existence.herokuapp"
                    data-description="Example charge"
                    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    data-locale="auto"
                    data-currency="cad">
                </script>
                <button>Pay!</button>
            </form>
        );
    }
}

export default EasyCheckoutForm;