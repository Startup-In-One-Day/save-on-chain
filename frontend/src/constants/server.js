const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'http://myapidomain.com'
  : 'http://localhost:3000/api/charge';

export default PAYMENT_SERVER_URL;

