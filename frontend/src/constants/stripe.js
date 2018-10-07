const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_MY_PUBLISHABLE_KEY'
  : 'pk_test_bU6iUnuJ1OlZcQyNqiPK7O6S';

export default STRIPE_PUBLISHABLE;