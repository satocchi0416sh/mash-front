import { useState, useEffect } from "react"
import api from "../items/api"
import { useHistory } from "react-router-dom"

function InquiryA() {
    //ページネーション求む
    const [ ilist, setIlist ] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get("getInquiry").then((response) => {
            setIlist(response.data)
            console.log(response.data)
        })
    },[])

    return (
        <div className="App">
        <br/><br/><br/><br/>
        <button onClick={() => {history.push(`send/0/0`)}}>全体にお知らせ</button>
        <h1>お問い合わせ</h1>
        {ilist.map((data,index)=>{
        return(
            <div key={index}>
                {data.isCheck === 1 ?
                <p>送信済み</p>
                :
                null
                }
                <h2>氏名 : {data.username}</h2>
                <h3>{data.text}</h3>
                <h5>{data.newTime}</h5>
                <button onClick={() => {history.push(`send/${data.userId}/${data.inquiryId}`)}}>返信する</button>
            </div>
        )
        })}
        </div>
    );
}
export default InquiryA