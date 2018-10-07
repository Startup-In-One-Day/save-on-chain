const express = require('express');
const config = require('../config');
const router = express.Router();
const stripe = require('stripe')(config.stripe_key);

router.get('/', (req, res, next) => {
    res.status(200).send('Hello Stripe');
});


router.post('/charge', (req, res, next) => {
    // create a customer
    let amount = req.body.amount || 100;

    let hash = req.body.hash;
    let message = req.body.message;
  
    // create a customer and charge their card
    stripe.customers.create({
            email: req.body.email,
            source: req.body.token // token for a given card
        })
        .then(customer => 
            stripe.charges.create({
                amount,
                description: 'write to blockchain',
                currency: 'CAD',
                customer: customer.id
                })
            .then(result => {

                console.log('Payment received');
                res.status(200).send(result);
            })
            .catch(err => {
                console.log('Super error: ' + err);
            }))
        .catch(err => {
            console.log("error!!!! " + err);
        });
});

module.exports = router;