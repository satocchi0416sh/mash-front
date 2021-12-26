import { useState, memo } from "react"

const Checkbox = memo((props) => {
    const { reaName, addRea, deleteRea } = props  
    const [ isCheck, setIsCheck ] = useState(false)

    const check = () => {
        setIsCheck(true)
        addRea(reaName)
    }

    const deleteCheck = () => {
        setIsCheck(false)
        deleteRea(reaName)
    }

    return(
        <>
        {isCheck ?
        <>
        <button onClick={deleteCheck}>Check/{reaName}</button>
        </>
        :
        <>
        <button onClick={check}>{reaName}</button>
        </>
        }
        </>
    )
})

export default Checkbox