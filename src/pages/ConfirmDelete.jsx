import React, {useRef} from 'react'
import "./UpdateCustomer.scss"

const ConfirmDelete = ({deleteShow, setDeleteShow, onClick}) => {
  const confirmRef = useRef(null)
  const handleDisplay = () => {
    if (deleteShow) {
      confirmRef.current.classList.add("show");
    }
  };
  handleDisplay();

  const handleClose = () => {
    confirmRef.current.classList.remove("show");
    setDeleteShow(false)
  };

  const handleSupport = () => {
    confirmRef.current.classList.remove("show");
    setDeleteShow(false)
  }

  return (
    <div ref={confirmRef} className='delete_confirm border-[1px] border-black w-[200px] h-[200px]'>
        <div className="heading flex border-b-[1px] border-[rgba(0,0,0,0.15)] px-[15px] py-[17px] font-[700] relative">
          <h2>Xác Nhận</h2>
          <h3 onClick={handleClose} className='absolute cursor-pointer top-[5px] right-[5px] w-[25px] text-[#777] font-[900] hover:text-[#555]'>x</h3>
        </div>
        <div className="body flex border-b-[1px] border-[rgba(0,0,0,0.15)] px-[15px] py-[17px] font-[500] ">
          <h3>Bạn có muốn xóa mục này không?</h3>
        </div>
        <div className="footer flex flex-1 items-center justify-end mx-[15px] my-[17px]">
          <button className='outline-none p-[10px] w-[65px] h-[40px] bg-[#373333] rounded-[5px] text-white mr-[15px]' onClick={handleClose}>Hủy</button>
          <button className='outline-none p-[10px] w-[65px] h-[40px] bg-[#d62818] rounded-[5px] text-white mr-[15px]' onClick={() => {onClick(); handleSupport()}}>Xóa</button>
        </div>
    </div>
  )
}

export default ConfirmDelete