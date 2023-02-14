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
    console.log("amount : " + amount)
    console.log("title : " + title)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            console.log("Je rentre dans mon try")
            const cardElement = elements.getElement(CardElement);

            const stripeResponse = await stripe.createToken(cardElement, {
                name: user_id,
            });

            const stripeToken = stripeResponse.token.id;
            console.log("Token de Stripe : " + stripeToken)
            const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
                token: stripeToken,
                title: title,
                amount: amount,
            });
            console.log(response)
            if (response.data.status === "succeeded") {
                setIsLoading(false);
                setCompleted(true);
            }
        } catch (error) {
            console.log("Je rentre dans mon catch")
            console.log(error.response);
        }
    }

    return (
        <form className="column" onSubmit={handleSubmit}>
            <div className="strip__title" >Informations bancaires pour le paiement</div>
            <div className="cardElement input-txt"><CardElement /></div>

            {completed ? (
                <div className="payment--done">Bien joué, super affaire ! Paiement effectué 💸</div>
            ) : (
                <button className="btn btn--dark" disabled={isLoading} type="submit">Payer</button>
            )}
        </form>
    );
};

export default CheckoutForm;