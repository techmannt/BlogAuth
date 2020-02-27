import * as React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonateForm from './DonateForm';

const stripePromise = loadStripe('pk_test_jeqPk7DSDHPclqVHa2eDy6aq00uQs3SDP0');

const Donate: React.FC<DonateProps> = props => {
  return(
    <Elements stripe={stripePromise}>
      <DonateForm />
    </Elements>
  );
}

interface DonateProps {}

export default Donate;
