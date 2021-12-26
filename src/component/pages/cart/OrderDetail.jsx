import { useState, useEffect } from "react"
import api from "../../items/api"

function OrderDetail(props){
    const { orderId, date, step } = props
    const [ list, setList ] = useState([])

    /* カートの中身リストを取得 */
    useEffect(() => {
        api.get(`getOcards/${orderId}`).then((response) => {
            setList(response.data)
            console.log(response.data)
        })
    },[orderId])

    return(
        <>
        {step ===0 ?
        <h3>{date}までにお届け【発送準備中】</h3>
        :
        <h3>{date}までにお届け【発送完了】</h3>
        }
        
        {list.map((data, index) => {
            return(
                <div key={index}>
                    <h3>{data.cardname} / {data.number}枚 / {Number(data.number) * Number(data.price)}円</h3>
                </div>
            )
        })}
        <br/><br/>
        </>
    )
}
export default OrderDetail