import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react'
import "../scss/main.scss"
import { Markup } from 'interweave';

const Details = ({detailShow, setDetailShow, rowId, setRowId, getSingleData}) => {
  const [datas, setDatas] = useState({})
  const confirmRef = useRef(null)
  const handleDisplay = () => {
    if (detailShow) {
      confirmRef.current.classList.add("show");
    }
  };
  handleDisplay();


  const getData = async () => {
    if(rowId) {
      const {data} = await axios.get(`${getSingleData}${rowId}`)
      setDatas(data)
    }
  }

  useEffect(() => {
    getData()
  }, [rowId])

  const handleClose = () => {
    setRowId(null);
    confirmRef.current.classList.remove("show");
    setDetailShow(false)
  };

  return (
    <div className="update-customer">
      <form ref={confirmRef} className="confirm">
        <div className="p-[20px] h-[645px]">
          <div className="closed" onClick={handleClose}>
            <i className="fa-solid fa-square-xmark"></i>
          </div>
          <h1 className='font-[700] text-[25px]'>{datas.title}</h1>
          <h3 className='font-[600] text-start text-[17px]'>{datas.shortDescription}</h3>
          {/* <div className='flex justify-center items-center w-[100%] h-[400px]'>
            <img className='align-middle w-[400px] h-[350px]' src={`http://18.140.66.234${datas.thumbnail}`}  alt="thumbnail" />
          </div> */}
          <div className='mt-[20px] text-start'>
          <Markup className='font-[400] text-start text-[13px]' content={datas.content} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Details