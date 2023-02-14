//? React router dom import
import { useLocation } from "react-router-dom"

//? Stripe import
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//? Components import 
import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP")


const Payment = () => {



    const data = useLocation();
    console.log(data)
    const user_id = data.state.data.owner._id;
    console.log(user_id);
    const price = data.state.data.product_price.toFixed(2)
    const fee = (price * 1.10).toFixed(2)
    const shippingFee = 5.2
    const totalPrice = price * 1 + fee * 1 + shippingFee * 1
    const totalPriceCents = totalPrice * 1000
    const totalPriceCentsString = totalPriceCents.toString()
    const product_description = data.state.data.product_description
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
            <div> Total {totalPrice} €</div>

            <Elements stripe={stripePromise} >
                <CheckoutForm user_id={user_id} amount={totalPriceCentsString} title={product_description} />
            </Elements>


        </div>
    )
}

export default Payment;