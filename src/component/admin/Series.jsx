import { useState, useEffect } from "react"
import api from "../items/api"
import Item from "./item"

function Series() {
    const [ slist, setSlist ] = useState([])
    const [  newSeries, setNewSeries ]=useState("")

    useEffect(() => {
        api.get("getSeries").then((response) => {
            setSlist(response.data)
            console.log(response.data)
        })
    },[])

    const addSeries=()=>{
        api.post("addSeries",{
            seriesname:newSeries
        })
        setSlist([...slist,{seriesname:newSeries}])
        setNewSeries("")
    }

    return (
        <div className="App">
        <h1>シリーズ追加</h1>
        <input type="text" value={newSeries} onChange={(e)=>{setNewSeries(e.target.value)}}/>
        <button onClick={addSeries}>追加</button>
        {slist.map((data,index)=>{
        return(
            <Item key={index} id={data.seriesId} name={data.seriesname}/>
        )
        })}
        </div>
    );
}
export default Series