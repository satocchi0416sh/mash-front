import StripeContainer from "./StripeContainer"
import { useState, useEffect } from "react"
import api from "../../items/api"
import areaData from "../../items/AreaData"
import Axios from "axios"

function Payment(props){
    const { id, loadingC } = props
    const [ page, setPage ] = useState("1")
    const [ list, setList ] = useState([])
    const [ amount, setAmount ] = useState("")
    const [ adress, setAdress ] = useState("")
    const [ isCheck, setIsCheck ] = useState(false)

    /* 住所系 */
    const [ zipCode, setZipCode ] = useState("")
    const [ adress1, setAdress1 ] = useState("")
    const [ adress2, setAdress2 ] = useState("")
    const [ adress3, setAdress3 ] = useState("")
    const [ adress4, setAdress4 ] = useState("")

    useEffect(() => {
        api.get(`getItems/${id}`).then((response) => {
            console.log(response.data)
            setList(response.data)
            let i = 0;
            response.data.forEach((data) => {
                i += data.price * data.number
            })

            setAmount(i)
        })
        api.get(`getAdress/${id}`).then((response) => {
            setAdress(response.data.adress)
        })
    },[id])

    const completePay = async() => {
        const date = new Date()
        date.setDate(date.getDate() + 14);
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const a = `${year}/${month}/${day}`
        const { data }  = await api.post("completePay",{
            id:id,
            date:a
        })
        setPage("4")
        const orderId = data.insertId
        list.forEach((data) => {
            api.post("addOcard",{
                orderId:orderId,
                cardId:data.cardId,
                cardname:data.cardname,
                cardImage:data.cardImage,
                price:data.price,
                number:data.number
            })
        })
        api.post("deleteAllItems",{
            userId:id
        }).then((response) => {
            loadingC()
        })
    }

    const checkStock = async() => {
        const i = await checkForEach()
        console.log(i)
        if( i > 0 ){
            alert("在庫切れのカードがあります")
            return false
        }else{
            return true
        }
        
    }
    const checkForEach = async() => {
        let i = 0
        const response = await Promise.all(list.map(async(d) => {
            const {data} = await api.get(`checkStock/${d.cardId}/${d.number}`)
            console.log(data.result)
            if(!data.result){
                i += 1
                alert("在庫切れのカードがあります")
            }
        }))
        return i
    }
    /* 住所検索 */
    const searchAdress = () => {
        Axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`)
        .then((response) => {
            if(response.data.status === 400){
                alert("正しい郵便番号を入力してください")
            }else{
                let a = response.data.results[0]
                console.log(a)
                console.log(a.address1)
                setAdress1(a.address1)
                setAdress2(a.address2 + a.address3)
            }
            console.log(response.data)
        })
    }

    /* 住所登録 */
    const addAdress = (e) => {
        e.preventDefault()
        let newAdress = zipCode + "," + adress1 + " " + adress2 + " " +adress3 + " " +adress4
        api.post("addAdress",{
            id:id,
            adress:newAdress
        })
        setPage("3")
    }

    let currentPage
    if(page === "1"){
        currentPage=
        <div className="comu-form2">
            <h2>ご請求額</h2>
            <p>{amount}円(税込)</p>

            <button onClick={()=>{setPage("2")}}>次へ</button>
        </div> 
    }else if(page === "2"){
        currentPage=<>
        <h2>お届け先のご住所</h2>
            {adress !== null ?
            <>
                {isCheck ?
                <>
                <button onClick={()=>{setIsCheck(false)}}>新しい住所を設定する</button>
                <h3>{adress}</h3>
                <button onClick={()=>{setPage("3")}}>次へ</button>
                </>
                :
                <>
                <button onClick={()=>{setIsCheck(true)}}>登録済みの住所を使う</button>
                <form onSubmit={addAdress}>
                <p>郵便番号</p>
                <input type="number" value={zipCode} onChange={(e)=>{setZipCode(e.target.value)}} />
                <button type="button" onClick={searchAdress}>住所検索</button>
                <p>都道府県</p>
                <select className="cp_sl06" required  value={adress1} onChange={(e) => { setAdress1(e.target.value) }}>
                    <option value="" hidden disabled></option>
                    {areaData.map((data,index) => {
                        return(
                            <option key={index} value={data}>{data}</option>
                        )
                    })}
                </select>
                <p>市区町村</p>
                <input type="text" required value={adress2} onChange={(e)=>{setAdress2(e.target.value)}} />
                <p>番地</p>
                <input type="text" required value={adress3} onChange={(e)=>{setAdress3(e.target.value)}} />
                <p>建物名・部屋番号</p>
                <input type="text" value={adress4} onChange={(e)=>{setAdress4(e.target.value)}} />
                <br/>
                <button type="submit">次へ</button>
                </form>
                </>
                }
            </>
            :
            <>
            <form onSubmit={addAdress}>
            <p>郵便番号</p>
            <input type="number" value={zipCode} onChange={(e)=>{setZipCode(e.target.value)}} />
            <button type="button" onClick={searchAdress}>住所検索</button>
            <p>都道府県</p>
            <select className="cp_sl06" required  value={adress1} onChange={(e) => { setAdress1(e.target.value) }}>
                <option value="" hidden disabled></option>
                {areaData.map((data,index) => {
                    return(
                        <option key={index} value={data}>{data}</option>
                    )
                })}
            </select>
            <p>市区町村</p>
            <input type="text" required value={adress2} onChange={(e)=>{setAdress2(e.target.value)}} />
            <p>番地</p>
            <input type="text" required value={adress3} onChange={(e)=>{setAdress3(e.target.value)}} />
            <p>建物名・部屋番号</p>
            <input type="text" value={adress4} onChange={(e)=>{setAdress4(e.target.value)}} />
            <br/>
            <button type="submit">次へ</button>
            </form>
            </>
            }
        </>
    }else if(page === "3"){
        currentPage = <StripeContainer completePay={completePay} amount={amount} checkStock={checkStock}/>
    }else{
        currentPage=<div>
            <h3>お支払いが完了しました</h3>

            </div>
    }
    return(
        <div>
            <br/><br/><br/><br/>
            <h1>決済</h1>
            <div className="clip-box-a">
                {currentPage}
            </div>
        </div>
    )
}
export default Payment