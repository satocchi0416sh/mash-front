import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import api from "../items/api"

function TopA() {
    const history = useHistory()
    const [ inquiryNum, setInquiryNum ] = useState(0)//未回答のお問い合わせの数

    useEffect(() => {
        api.get("getInquiryNum").then((response) => {
            setInquiryNum(response.data.num)
            console.log(response.data.num)
        })
    },[])

    return(
        <>
            <br/><br/>
            <button onClick={()=>{history.push("/admin/setting")}}>カード設定</button>
            <br/><br/>
            <button onClick={()=>{history.push("/admin/add")}}>カードの追加</button>
            <br/><br/>
            <button onClick={()=>{history.push("/admin/series")}}>シリーズの追加</button>
            <br/><br/>
            <button onClick={()=>{history.push("/admin/inquiry")}}>お問い合わせ＆お知らせ設定</button>

        </>
    )
}
export default TopA