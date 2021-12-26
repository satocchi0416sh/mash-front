import { useEffect, useState } from "react"
import api from "../../items/api"
function Inquiry(props) { 
    const { id } = props
    const [ name, setName ] = useState("")
    const [ text, setText ] = useState("")

    useEffect(() => {
        api.get(`getName/${id}`).then((response) => {
            setName(response.data.username)
            console.log(response.data.username)
        })
    },[id])
    
    const submit = (e) => {
        e.preventDefault()
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        api.post("sendInquiry",{
            userId:id,
            username:name,
            text:text,
            time:year + "-" + month + "-" + day + " " + hour + ":" + minute,
        })
    }

    return(
        <>
        <br/><br/><br/><br/>
        <h1>お問い合わせ</h1>
        <form onSubmit={submit}>
            <label>お問い合わせ内容</label>
            <br/>
            <textarea value={text} onChange={(e) => {setText(e.target.value)}} required/>
            <br/>
            <button type="submit">送信</button>
        </form>
        </>
    )
}
export default Inquiry