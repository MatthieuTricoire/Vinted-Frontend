//? Stripe imports
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//? Axios imports
import axios from "axios";

//? React hooks imports
import { useState } from "react";

const CheckoutForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [completed, setCompleted] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
}