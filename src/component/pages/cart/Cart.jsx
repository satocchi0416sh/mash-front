import { useState, useEffect } from "react"
import api from "../../items/api"
import { useHistory } from "react-router-dom"

function Cart(props){
    const { id, loadingC} = props
    const [ list, setList ] = useState([])
    const history = useHistory()

    /* カートの中身リストを取得 */
    useEffect(() => {
        getItem()
    },[id])

    /* カートの中身から外す */
    const deleteItem = (cardId) => {
        api.post("deleteItem" ,{
            userId:id,
            cardId:cardId
        }).then((response) => {
            getItem()
            loadingC()
        })
    }

    const getItem = () => {
        api.get(`getItems/${id}`).then((response) => {
            setList(response.data)
        })
    }
    
    return(
        <>
        <br/><br/><br/><br/>
        <h1>カート</h1>
        {list.map((data, index) => {
            return(
                <div key={index}>
                <h2>{data.cardname}</h2>
                <img src={data.cardImage} alt="" />
                <p>{data.cardname}</p>
                <p>販売価格: {data.price}円</p>
                <label>数量: {data.number}</label>
                <br/>
                <button onClick={()=>{deleteItem(data.cardId)}}>削除</button>
                </div>
            )
        })}
        <br/><br/><br/>
        {list.length > 0 ?
        <button onClick={()=>{history.push(`/payment/${id}`)}}>購入手続きに進む</button>
        :
        <h2>カートに追加されたカードはありません。</h2>
        }
        
        </>
    )
}
export default Cart