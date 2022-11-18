import React ,{ useEffect, useState} from 'react'
import API from '../API/NewsAPI'
const Notificate = () => {
    const [dataNews,setdataNews] = useState([])
    const fetchData = async(page,size) =>{
        await fetch(API.getNewsPageAPI(page,size)
        .then(
            data => setdataNews(data)
        )
        .then(console.log(dataNews.data)))
    }

    useEffect(() => {
        fetchData(1,10)
    })

  return (
    <div>Notificate</div>
  )
}

export default Notificate