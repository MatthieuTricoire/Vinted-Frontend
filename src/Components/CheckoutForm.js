//? Stripe imports
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//? Axios imports
import axios from "axios";

//? React hooks imports
import { useState } from "react";

const CheckoutForm = ({ user_id, amount, title }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    console.log("user id : " + user_id)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const cardElement = elements.getElement(CardElement);

            const stripeResponse = await stripe.createToken(cardElement, {
                name: user_id,
            });

            const stripeToken = stripeResponse.token.id;

            const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
                stripeToken: stripeToken,
            });
            if (response.data === "succeeded") {
                setIsLoading(false);
                setCompleted(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Informations bancaires pour le paiement</h2>
            <CardElement />

            {completed ? (
                <div className="payment--done">Bien joué, super affaire ! Paiement effectué 💸</div>
            ) : (
                <button className="btn btn--dark" disabled={isLoading} type="submit">Payer</button>
            )}
        </form>
    );
};

export default CheckoutForm;