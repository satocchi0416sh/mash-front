import { useEffect, useState  } from "react"
import { useHistory, useParams } from "react-router-dom"
import api from "../../items/api"

function CardInfo(props){
    const { id, loadingC, loadingL } = props
    const { cardId } = useParams()
    const [ cardInfo, setCardInfo ] = useState({})//カード情報
    const [ stock, setStock ] = useState([])
    const [ number, setNumber ] = useState("1")

    /* カード情報取得 */
    useEffect(() => {
        api.get(`getCardInfo/${cardId}`)
        .then((response) => {
            setCardInfo(response.data)
            let i=[]
            for(let n=1;n <= response.data.stock; n++){
                i.push(n)
            }
            setStock(i)
        })
    },[cardId])

    /* カートに追加 */
    const addCart = async() => {
        if(id === null || id === undefined){
            alert("カートに追加するためにはログインが必要です")
            return
        }
        const { data } = await api.get(`checkItem/${id}/${cardId}`)
        console.log(data)
        if(data.length > 0){
            alert("この商品はすでにカートにあります")
        }else{
            api.post("addItem",{
                userId:id,
                cardId:cardId,
                cardname:cardInfo.cardname,
                cardImage:cardInfo.cardImage,
                price:cardInfo.price,
                number:number
            }).then((response) => {
                loadingC()
            })

        }
    }

    const addLike = async() => {
        if(id === null || id === undefined){
            alert("お気に入りに追加するためにはログインが必要です")
            return
        }
        const { data } = await api.get(`checkLike/${id}/${cardId}`)
        console.log(data)
        if(data.length > 0){
            alert("この商品はすでにお気に入りにあります")
        }else{
            api.post("addLike",{
                userId:id,
                cardId:cardId,
                cardname:cardInfo.cardname,
                cardImage:cardInfo.cardImage,
                price:cardInfo.price,
            }).then((response) => {
                loadingL()
            })
        }
    }


    return(
        <>
        <h2>{cardInfo.cardname}</h2>
        <img src={cardInfo.cardImage} alt="" />
        <p>{cardInfo.cardname}</p>
        <p>販売価格: {cardInfo.price}円</p>
        <p>在庫数 {cardInfo.stock}枚</p>
        <label>数量:</label>
        <select className="cp_sl06" required  value={number} onChange={(e) => { setNumber(e.target.value) }}>
            <option value="" hidden disabled></option>
            {stock.map((data,index) => {
                return(
                    <option key={index} value={data}>{data}</option>
                )
            })}
        </select>
        <br/>
        {cardInfo.stock !== 0 ?
        <button onClick={addCart}>カートに入れる</button>
        :
        null
        }
        
        <br/>
        <button onClick={addLike}>お気に入り登録</button>
        </>
    )
}
export default CardInfo