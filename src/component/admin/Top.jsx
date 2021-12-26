import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

function TopA() {
    const history = useHistory()
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