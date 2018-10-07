const TESTNET_SERVER_URL = process.env.NODE_ENV === 'production'
?  'https://putonchain.herokuapp.com' 
: 'http://localhost:3000';

export default TESTNET_SERVER_URL;
