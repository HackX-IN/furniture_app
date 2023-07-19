import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'




const useFetch = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const FetchData=async()=>{
        setLoading(true)
        try {
            const response=await axios.get("https://productserver-4mtw.onrender.com/api/v1/getall")
            console.log(response.data)
            setData(response.data)
          
            setLoading(false)
            
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        FetchData()
    },[])

    const Refetch=()=>{
        setLoading(true)
        FetchData()
    }

  return {data,loading,error,Refetch}
}

export default useFetch