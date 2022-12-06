import React, { useRef, useEffect, useState } from "react";
import NotificationAPI from "../API/NotificationAPI";
import "./UpdateNotification.scss";
import updateFormImg from "../assests/updateForm.png";
import { toast } from "react-toastify";
import axios from "axios";

const CreateNotification = ({ createShow, setCreateShow, keyFresh ,setKeyFresh }) => {
    const confirmRef = useRef();
    const [message,setMessenger] = useState('');

    const [notification, setNotification] = useState({});
    const [activeInput, setActiveInput] = useState(null);
    
    const [classCodes,setClassCodes] = useState();
    const [facultyCode,setFacultyCode] = useState();
    const [notificationGroupCode,setNotificationGroupCode] = useState([]);
    const [schoolYearCodes,setSchoolYearCodes] = useState();
    
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [notifiGD, setNotifiGD] = useState("")

    const handleDisplay = () => {
      if (createShow) {
        confirmRef.current.classList.add("show");
      }
    };
    handleDisplay();

    const getNotificationGroupCode = async() => {
      const {data} = await axios.get("http://18.140.66.234/api/v1/notification-groups/all?status=true")
      setNotificationGroupCode(data)
    }

    useEffect(() => {
      getNotificationGroupCode()
    }, [keyFresh])

    const handleClose = () => {
      setContent("")
      setTitle("")
      setNotifiGD("")
      setShortDescription("")
      setActiveInput(null);
      setCreateShow(!createShow);
      confirmRef.current.classList.remove("show");
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        },
      };
      try{
        
        await axios.post("http://18.140.66.234/api/v1/notifications?" + new URLSearchParams({
          content,
          notificationGroupCode: notifiGD,
          shortDescription,
          title,
      }), undefined, config)
         
          handleClose()
          setKeyFresh(old => old + 1)
          toast.success("successfully!")

      } catch(err){
        toast.error("Error!")
      }
    }

    return (
      <div className="update-customer">
        <form ref={confirmRef} className="confirm">
          <div className="p-[20px] h-[645px]">
            <div className="closed" onClick={handleClose}>
              <i className="fa-solid fa-square-xmark"></i>
            </div>
            <div className="heading-confirm">
              <div className="flex justify-center items-center">
                <img
                  src={updateFormImg}
                  width="170px"
                  height="135px"
                  alt="imgForm"
                />
                <h1 className="text-[20px] font-[600]">
                  Tạo Thông Báo
                </h1>
              </div>
            </div>
            <div className="border-b-[1px] border-black"></div>
            <div className="mb-[20px] flex flex-col justify-center mx-[20px]">
              <div className="flex justify-center items-center">
                <div
                  className={` ${
                    activeInput == "first_1" && "active-input"
                  } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
                >
                  <h3 className="mb-[12px] font-[500] text-[16px]">Title</h3>
                  <input
                  name="title"
                  value = {title}
                  onChange={(e)=>{
                   setTitle(e.target.value)
                  }}
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                    type="text"
                    id="first_1"
                  />
                  <label className="font-[400] text-[11px]" htmlFor="first_1">
                    {notification.title}
                  </label>
                </div>
                <div
                  className={`${
                    activeInput == "first_2" && "active-input"
                  } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
                >
                  <h3 className="mb-[12px] font-[500] text-[16px]">
                    Short Descriptions
                  </h3>
                  <input
                    name = "ShortDescription"
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
                    }}
                    value = {shortDescription}
                    onChange={(e)=>{
                      setShortDescription(e.target.value)
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                    type="text"
                    id="first_2"
                  />
                  <label className="font-[400] text-[11px]" htmlFor="first_2">
                    {notification.shortDescription}
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className={` ${
                    activeInput == "first_3" && "active-input"
                  } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
                >
                  <h3 className="mb-[12px] font-[500] text-[16px]">Content</h3>
                  <textarea
                  name= "content"
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
                    }}
                    value = {content}
                    onChange={(e)=>{
                      setContent(e.target.value)
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="mb-[12px] px-[12px] w-[348px] h-full input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                    type="text"
                    id="first_3"
                  />
                  <label className="font-[400] text-[11px]" htmlFor="first_3">
                  </label>
                </div>
                {/* <div
                  className={`${
                    activeInput == "first_4" && "active-input"
                  } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
                >
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                  <input 
                    name = "thumbnail"
                    accept = "png,jpeg,jpg"
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
                    }}
                    onChange={(e)=>{
                      setObj((old)=>{
                        const newobj = {...obj,thumbnail:e.target.files};
                        return newobj
                      }) 
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="file_input" 
                    type="file"
                  />

                </div> */}
                <div
              className={`${
                activeInput == "create_4" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">
                Đối tượng thông báo
              </h3>
              <select 
              value={notifiGD }
              onFocus={(e) => {
                setActiveInput(e.target.id)
              }}
              onChange={(e) => {
                setNotifiGD(e.target.value)
              }}
              className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]" name="" >
                <option value="" selected>Chọn Đối Tượng</option>
                {
                  notificationGroupCode.map((item, i) => (
                    <option
                    key={i}
                    id="create_4"
                    value={item.code}>
                    {item.name}
                  </option>
                  ))
                }
              </select>
            </div>
              </div>  
            </div>
            <div className="border-b-[1px] border-black"></div>
            <div className="flex justify-center items-center text-center">
              <button onClick={handleSubmit} className="btn-set-css min-w-[180px] my-[20px] rounded-[3px]  h-[50px] p-[10px] font-[900] text-[15px] border-[1px] border-[rgb(216, 65, 48)]">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default CreateNotification