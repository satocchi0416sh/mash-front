import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../../items/api"
import Checkbox from "../../ui/Checkbox"

function Search() {
    const history = useHistory()
    const typeList = ["全て", "ポケモン", "トレーナー", "グッズ"]
    const reaList = ["なし", "UR", "HR", "SR", "SSR", "S", "CSR", "CHR", "RRR", "RR", "R", "C", "UC"]

    const [ cardname, setCardName ] = useState("")
    const [ rea, setRea ] = useState([])
    const [ series, setSeries ] = useState("")
    const [ type, setType ] = useState("全て")
    const [ number, setNumber ] = useState("")

    const [ slist, setSlist ] = useState([])
    const [ cardList, setCardList ] = useState([])

    useEffect(() => {
        search()
    },[])

    useEffect(() => {
        api.get("getSeries").then((response) => {
            setSlist(response.data)
            setSeries(response.data[0].seriesname)
        })
    },[])

    const addRea = (reaName) => {
        setRea([...rea, reaName])
    }

    const deleteRea = (reaName) => {
        setRea(rea.map((data) => {
            if(data === reaName){
                return(null)
            }else{
                return(data)
            }
        }))
    }

    const search = () => {
        api.post("getCards",{
            cardname:cardname,
            rea:rea,
            series:series,
            type:type,
            number:number
        }).then((response) => {
            console.log(response.data)
            setCardList(response.data)
        })
    }

    return (
        <div className="top-page">
            <br/><br/><br/><br/>
            <h1>検索ページ</h1>
            <label>カード名</label>
            <input type="text" value={cardname} onChange={(e)=>{setCardName(e.target.value)}}/>
            <br/>
            <label>シリーズ</label>
            <select className="cp_sl06" required  value={series} onChange={(e) => { setSeries(e.target.value) }}>
                <option value="" hidden disabled></option>
                {slist.map((data,index) => {
                    return(
                        <option key={index} value={data.seriesname}>{data.seriesname}</option>
                    )
                })}
            </select>
            <br/>
            <label>ナンバー</label>
            <input type="number" value={number} onChange={(e)=>{setNumber(e.target.value)}} required/>
            <br/>
            <label>カード種類</label>
            <select className="cp_sl06" required  value={type} onChange={(e) => { setType(e.target.value) }}>
                <option value="" hidden disabled></option>
                {typeList.map((data,index) => {
                    return(
                        <option key={index} value={data}>{data}</option>
                    )
                })}
            </select>
            <br/>
            <label>レアリティ</label>
            <br/>
            {reaList.map((data, index) => {
                return(
                    <Checkbox key={index} reaName={data} 
                    addRea={addRea} deleteRea={deleteRea} />
                )
            })}
            <br/><br/>
            <button onClick={search}>検索</button>

            <br/><br/><br/>
            {cardList.map((data,index) => {
                return(
                    <div key={index} onClick={()=>{history.push(`/cardInfo/${data.cardId}`)}}>
                        <img src={data.cardImage} alt="" />
                    </div>
                )
            })}
        </div >
    )
}
export default Search