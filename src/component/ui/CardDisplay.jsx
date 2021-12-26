import { useEffect, useState, memo } from "react"
import api from "../items/api"

const CardDisplay = memo((props) => {
    const { cardId, cardname, cardImage, price, stock, series, type, rea, number, search} = props
    const [ newName, setNewName ] = useState(cardname)
    const [ newPrice, setNewPrice ] = useState(price)
    const [ newStock, setNewStock ] = useState(stock)
    const [ newSeries, setNewSeries ] = useState(series)
    const [ newNumber, setNewNumber ] = useState(number)
    const [ newRea, setNewRea ] = useState(rea)
    const [ newType, setNewType ] = useState(type)

    const [ slist, setSlist ] = useState([])
    const typeList = ["ポケモン", "トレーナー", "グッズ"]
    const reaList = ["なし", "UR", "HR", "SR", "SSR", "S", "CSR", "CHR", "RRR", "RR", "R", "C", "UC"]

    useEffect(() => {
        api.get("getSeries").then((response) => {
            setSlist(response.data)
        })
    },[])

    const editCard = (e) => {
        e.preventDefault()
        api.post("editCard", {
            cardId:cardId,
            cardname:newName,
            price:newPrice,
            stock:newStock,
            series:newSeries,
            type:newType,
            rea:newRea,
            number:newNumber
        })
    }
    const deleteCard = () => {
        api.post(`deleteCard/${cardId}`).then((response) => {
            search()
        })
    }

    return(
        <div>
            <form onSubmit={editCard}>
                <img src={cardImage} alt="" />
                <br/>
                <label>カード名</label>
                <input value={newName} onChange={(e)=> {setNewName(e.target.value)}}/>
                <br/>
                <label>販売価格</label>
                <input type="number" value={newPrice} onChange={(e)=> {setNewPrice(e.target.value)}}/>
                <br/>
                <label>在庫数</label>
                <input type="number" value={newStock} onChange={(e)=> {setNewStock(e.target.value)}}/>
                <br/>
                <label>シリーズ</label>
                <select className="cp_sl06" required  value={newSeries} onChange={(e) => { setNewSeries(e.target.value) }}>
                    <option value="" hidden disabled></option>
                    {slist.map((data,index) => {
                        return(
                            <option key={index} value={data.seriesname}>{data.seriesname}</option>
                        )
                    })}
                </select>
                <br/>
                <label>ナンバー</label>
                <input type="number" value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}} required/>
                <br/>
                <label>カード種類</label>

                <select className="cp_sl06" required  value={newType} onChange={(e) => { setNewType(e.target.value) }}>
                    <option value="" hidden disabled></option>
                    {typeList.map((data,index) => {
                        return(
                            <option key={index} value={data}>{data}</option>
                        )
                    })}
                </select>
                <br/>
                <label>レアリティ</label>
                <select className="cp_sl06" required  value={newRea} onChange={(e) => { setNewRea(e.target.value) }}>
                    <option value="" hidden disabled></option>
                    {reaList.map((data,index) => {
                        return(
                            <option key={index} value={data}>{data}</option>
                        )
                    })}
                </select>
                <br/>
                <button type="submit">編集完了</button>
            </form>
            <button onClick={deleteCard}>削除</button>
        </div>
    )


    
})
export default CardDisplay
