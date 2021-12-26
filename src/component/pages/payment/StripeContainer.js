import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"
const PUBLIC_KEY="pk_test_51JeVoRLQaTBDIsAEJanri0OmfZZTRvnol1PTqSSq9Fi2q8gjBVieeqyfKRFWAXuT2W93K8dTC7rDTeASeYGVKdEo001bjPj0a9"
const stripeTestPromise=loadStripe(PUBLIC_KEY)
export default function StripeContainer(props){
    const {amount,completePay,begin,stop,checkStock}=props
    return(
        <Elements stripe={stripeTestPromise}>
            <PaymentForm begin={begin} stop={stop} completePay={completePay} amount={amount} checkStock={checkStock}/>
        </Elements>
    )
}