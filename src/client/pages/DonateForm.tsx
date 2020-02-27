import * as React from 'react';
import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const DonateForm: React.FC<DonateFormProps> = props => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const elements = useElements();
  const stripe = useStripe();
  const chargeIt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let cardElement = elements.getElement(CardElement);
    let { token: {id} } = await stripe.createToken(cardElement, { name });
    console.log({ name, amount });
    if (id) {
        let charge = {
          id,
          amount
        };
        try {
          let chargeData = await fetch(`/api/donate/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(charge)

          });
          if (chargeData.ok) {
            console.log('Charge successful!');
          }
        } catch (error) {
          console.log(error);
        }
    }
  };

  return (
    <main className="container">
      <section className="row justify-content-center my-2">
        <div className="col-md-8">
          <form className="form-group p-3 border rounded shadow">
            <div className="row">
              <div className="col-6">
                <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control my-1" placeholder="Enter your name" />
              </div>
              <div className="col-6">
                <input onChange={e => setAmount(e.target.value)} value={amount} type="text" className="form-control my-1" placeholder="Enter donation amount" />
              </div>
            </div>
            <CardElement className="form-control my-1" />
            <button onClick={chargeIt} className="btn btn-primary btn-block w-75 mx-auto shadow mt-3">Charge IT!</button>
          </form>
        </div>
      </section>
    </main>
  );
};

interface DonateFormProps { }

export default DonateForm;
