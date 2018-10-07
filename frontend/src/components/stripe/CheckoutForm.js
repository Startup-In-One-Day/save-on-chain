import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import './Stripe.css';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
    handleSubmit = (ev) => {
        // prevents default form submission
        ev.preventDefault();

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        this.props.stripe.createToken({ email: 'zepplin@rock.com' })
            .then(({token}) => {
                console.log('Received Stripe token');
                console.log(token);
                //"token":token,"msg": "test msg"
                //axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
                axios.post('http://localhost:3000/api/charge', {token} )
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(err => {
                console.log(err);
            });
        // However, this line of code will do the same thing:
        //
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    
        // You can also use createSource to create Sources. See our Sources
        // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
        //
        // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* <AddressSection /> */}
                <CardSection />
                <button>Confirm order</button>
            </form>
        );
    }
}

export default injectStripe(CheckoutForm);