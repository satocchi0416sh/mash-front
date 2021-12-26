import { useState } from "react"
import { useParams } from "react-router-dom"
import api from "../items/api"

function Send(){
    const { userId } = useParams()
    const [ title, setTitle ] = useState("")
    const [ text, setText ] = useState("")

    const sendMessage = (e) => {
        e.preventDefault()
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        api.post("sendMessage",{
            userId:userId,
            title:title,
            text:text,
            time: year + "-" + month + "-" + day + " " + hour + ":" + minute,
        })
    }
    return(
        <div>
            <br/><br/><br/>
            <form onSubmit={sendMessage}>
                <h2>件名</h2>
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <h3>本文</h3>
                <textarea value={text} onChange={(e)=>{setText(e.target.value)}}/>
                <br/>
                <button type="submit">送信</button>
            </form>
        </div>
    )
}
export default Send