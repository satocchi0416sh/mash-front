import { useState, useEffect } from "react"
import api from "../../items/api"

function Notice(props){
    const { id } = props
    const [ list, setList ] = useState([])

    /* カートの中身リストを取得 */
    useEffect(() => {
        api.get(`/getNotices/${id}`).then((response) => {
            setList(response.data)
            console.log(response.data)
        })
    },[id])
    
    return(
        <>
        <br/><br/><br/><br/>
        <h1>お知らせ</h1>
        {list.map((data,index) => {
            return(
                <div key={index}>
                    <h2>{data.title}</h2>
                    <h3>{data.text}</h3>
                    <h5>{data.newTime}</h5>
                </div>
            )
        })}
        </>
    )
}
export default Notice