//? React router dom import
import { useLocation } from "react-router-dom"

// //? Stripe import
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./components/CheckoutForm";

const Payment = () => {

    // const stripePromise = loadStripe("pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF")

    const data = useLocation();
    console.log(data)
    console.log(data.state.data.product_price)
    const price = data.state.data.product_price.toFixed(2)
    const fee = (price * 1.10).toFixed(2)
    const shippingFee = 5.2
    return (
        <div className="section">

            <h3>Résumé de la commande</h3>

            <div className="row">
                <div className="col">Commande</div>
                <div className="col">{price} €</div>
            </div>
            <div className="row">
                <div className="col">Frais de protection pour l'acheteur</div>
                <div className="col">{fee} €</div>
            </div>
            <div className="row">
                <div className="col">Frais de port</div>
                <div className="col">{shippingFee} €</div>
            </div>
            <div> Total {price * 1 + fee * 1 + shippingFee * 1} €</div>

            {/* <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements> */}


        </div>
    )
}

export default Payment;