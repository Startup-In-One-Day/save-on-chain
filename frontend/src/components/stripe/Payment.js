import React, { Component } from 'react';
import Checkout from './Checkout';
import './Payment.css';

class Payment extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <Checkout
            name={'Pay us moneeeeeey!'}
            description={'Please, we are poor'}
            amount={this.props.amount}
            //pass our hash and message props to the next as props
            hash={this.props.hash}
            message={this.props.message}
          />
          <p className='Disclaimer'>
            *We never have access to your credit card information.
            Please visit Stripe's <a href="https://stripe.com/docs/security"> security guide</a>
             for more information.
          </p>
        </div>
    );
  }
}

export default Payment;
