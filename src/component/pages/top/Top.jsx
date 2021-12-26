import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../../items/api"
function Top(props) {
    const { id } = props
    const history = useHistory()
    const [list, setList] = useState([])

    /* 全体へのお知らせ取得 */
    useEffect(() => {
        api.get("getAllNotices").then((response) => {
            setList(response.data)
        })
    },[])

    return (
        <div className="top-page">
            {list.map((data, index) => {
                return(
                    <div key={index}>
                        <h2>{data.title}</h2>
                        <h3>{data.text}</h3>
                        <h5>{data.newTime}</h5>
                    </div>
                )
            })}
        </div >
    )
}
export default Top