import { useState, useEffect } from "react"
import api from "../../items/api"
import OrderDetail from "./OrderDetail"

function Order(props){
    const { id } = props
    const [ list, setList ] = useState([])

    /* カートの中身リストを取得 */
    useEffect(() => {
        api.get(`getMyOrder/${id}`).then((response) => {
            setList(response.data)
            console.log(response.data)
        })
    },[id])

    return(
        <>
        <br/><br/><br/><br/>
        <h1>注文</h1>
        {list.map((data, index) => {
            console.log(data.newDate)
            return(
                <OrderDetail key={index} orderId={data.orderId} date={data.newDate} step={data.step}/>
            )
        })}
        </>
    )
}
export default Order