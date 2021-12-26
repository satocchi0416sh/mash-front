import {memo,useState} from "react"
import api from "../items/api"
const Item=memo((props)=>{
    const {id,name}=props
    const [open,setOpen]=useState(true)
    const [edit,setEdit]=useState(false)
    const [item,setItem]=useState(name)

    const editItem=()=>{
        api.post(`editSeries`,{
            seriesId:id,
            seriesname:item
        })
        setEdit(false)
    }

    const deleteItem=()=>{
        api.post(`deleteSeries/${id}`)
        setOpen(false)
    }

    return(
        <div>
            {open ?
            <>
                {edit ?
                    <>
                    <input type="text" value={item} onChange={(e)=>{setItem(e.target.value)}}/>
                    <button onClick={editItem}>変更</button>
                    </>
                :
                <>
                    <label>{item}</label>
                    <button onClick={()=>{setEdit(true)}}>編集</button>
                    <button onClick={deleteItem}>削除</button>
                </>
                }
            </>
            :
            null}
            
        </div>
    )
})
export default Item