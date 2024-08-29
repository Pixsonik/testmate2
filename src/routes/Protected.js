import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const Protected = (props) => {
    const {Components}=props
    const navigate=useNavigate()

    useEffect(()=>{
        let Login=localStorage.getItem("UserId")
        if(!Login){
            return navigate("/login")
        }
    })
    

  return (
    <Components/>
  )
}

export default Protected