import { useState, useEffect } from "react"
import api from "../../items/api"
import { useHistory } from "react-router-dom"

function Favorite(props){
    const { id, loadingL } = props
    const [ list, setList ] = useState([])
    const history = useHistory()
    
    /* お気に入りリストを取得 */
    useEffect(() => {
        getLikes()
    },[id])

    /* お気に入りから外す */
    const deleteLike = (cardId) => {
        api.post("deleteLike" ,{
            userId:id,
            cardId:cardId
        }).then((response) => {
            getLikes()
            loadingL()
        })
    }

    const getLikes = () => {
        api.get(`getLikes/${id}`).then((response) => {
            setList(response.data)
        })
    }

    return(
        <>
        <br/><br/><br/><br/>
        <h1>お気に入り</h1>
        {list.map((data, index) => {
            return(
                <div key={index}>
                <h2>{data.cardname}</h2>
                <img src={data.cardImage} alt="" onClick={()=>{history.push(`/cardInfo/${data.cardId}`)}}/>
                <p>{data.cardname}</p>
                <p>販売価格: {data.price}円</p>
                <br/>
                <button onClick={()=>{deleteLike(data.cardId)}}>削除</button>
                </div>
            )
        })}
        <br/><br/><br/>
        {list.length > 0 ?
        null
        :
        <h2>お気に入りに追加されたカードはありません。</h2>
        }
        </>
    )
}
export default Favorite