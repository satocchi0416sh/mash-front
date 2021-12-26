import { useElements,useStripe,CardElement,CardNumberElement, CardExpiryElement, CardCvcElement} from "@stripe/react-stripe-js"
import {useState} from "react"
import api from "../../items/api"
import Image1 from "../../images/8.gif"
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "rgb(0, 55, 107)",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "#92ccff" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function PaymentForm(props){
    const { amount, completePay, checkStock } = props
    const [ load, setLoad ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(elements.getElement(CardNumberElement))
        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardNumberElement)
        })
        console.log(paymentMethod)
        setLoad(true)
        let check = await checkStock()
        if(!check){
            setLoad(false)
            return
        }
        if(!error){
            try{
                const {id} = paymentMethod
                const response = await api.post("payment",{
                    amount:amount,//<=金額
                    id:id
                })
                console.log(response)
                if(response.data.success){
                    completePay()
                }else{
                    alert("お支払いに失敗しました。")
                    setLoad(false)
                }
            }catch(error){
                alert("Error",error)
                setLoad(false)
            }
        }else{
            alert(error.message)
            setLoad(false)
        }
        
    }
    return(
        <>
        {load
        ?
        <img alt="" src={Image1} className="comu-load-image"/>
        :
        <form onSubmit={handleSubmit}>
            <div className="comu-FormRow">
                <label>カード番号</label>
                <br/>
                <CardNumberElement options={CARD_OPTIONS} className="comu-Form"/>
                <label>有効期限</label>
                <CardExpiryElement  className="comu-Form"/>
                <label>セキュリティーコード</label>
                <CardCvcElement  className="comu-Form"/>
            </div>

            <button>支払い</button>
        </form>
        }
        </>
    )
}
export default PaymentForm