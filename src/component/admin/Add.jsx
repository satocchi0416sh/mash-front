import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { storage } from "../items/firebase"
import api from "../items/api"

function Add() {
    const [ slist, setSlist ] = useState([])
    const typeList = ["ポケモン", "トレーナー", "グッズ"]
    const reaList = ["なし", "UR", "HR", "SR", "SSR", "S", "CSR", "CHR", "RRR", "RR", "R", "C", "UC"]

    const [ name, setName ] = useState("")
    const [ huri, setHuri ] = useState("")
    const [ image, setImage ] = useState("")
    const [ preview, setPreview] = useState("")
    const [ type, setType ] = useState("ポケモン")
    const [ rea, setRea ] = useState("なし")
    const [ series, setSeries ] = useState("")
    const [ number, setNumber ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ stock, setStock ] = useState("")

    
    

    useEffect(() => {
        console.log(image)
        if (image !== "") {
            let blob = new Blob([image], { type: "image/jpeg" })
            const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            const N = 30;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
            const uploadRef = storage.ref("images").child(fileName);
            const uploadTask = uploadRef.put(blob);
            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url)
                    setPreview(url)
                }
                )
            })
        }
    },[image])

    useEffect(() => {
        api.get("getSeries").then((response) => {
            setSlist(response.data)
        })
    },[])

    const  addCard = (e) => {
        e.preventDefault()
        api.post("addCard",{
            cardname:name,
            hurigana:huri,
            cardImage:preview,
            rea:rea,
            type:type,
            series:series,
            number:number,
            price:price,
            stock:stock
        })
    }

    return(
        <>
            <br/><br/>
            <h1>カードの追加</h1>
            <form onSubmit={addCard}>
            <label>カード名</label>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
            <br/>
            <label>ふりがな</label>
            <input type="text" value={huri} onChange={(e)=>{setHuri(e.target.value)}} required/>
            <br/>
            <label>カード画像</label>
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} required/>
            <img src={preview} alt="" />
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
            <select className="cp_sl06" required  value={rea} onChange={(e) => { setRea(e.target.value) }}>
                <option value="" hidden disabled></option>
                {reaList.map((data,index) => {
                    return(
                        <option key={index} value={data}>{data}</option>
                    )
                })}
            </select>
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
            <label>価格（円）</label>
            <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} required/>
            <br/>
            <label>在庫（個）</label>
            <input type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}} required/>
            <br/>
            <button onClick={addCard}>追加</button>
            </form>
        </>
    )
}
export default Add