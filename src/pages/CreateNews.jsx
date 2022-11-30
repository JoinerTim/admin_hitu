import React, { useRef, useEffect, useState } from "react";
import NewsAPI from "../API/NewsAPI";
import "./CreateNews.scss";
import updateFormImg from "../assests/updateForm.png";
import { toast } from "react-toastify";

const CreateNews = ({ createShow, setCreateShow}) => {
    const confirmRef = useRef();
    const [message,setMessenger] = useState('');

    const [news, setNews] = useState({});
    const [activeInput, setActiveInput] = useState(null);
    const [obj,setObj] = useState({
      id:"",
      content:"",
      createdBy:"",
      createdDate:"",
      modifiedBy:"",
      modifiedDate:"",
      shortDescription:"",
      slug:"",
      status:"",
      thumbnail:"",
      title:""
    });
  
    const getNewsData = async (newsId) => {
      const { data: { id, content, createdBy, createdDate, modifiedBy, modifiedDate, shortDescription, slug, status, thumbnail, title} } = await NewsAPI.getPageNewsAPI(newsId);
      // console.log(data); 
      setObj({...obj,id,content,createdBy,createdDate,modifiedBy,modifiedDate,shortDescription,slug,status, thumbnail,title});
      // console.log(obj);
    };
    // useEffect(() => {
    //   if (newsId) {
    //     getNewsData(newsId);
    //   }
    // }, [newsId]);
  



    const handleDisplay = () => {
      if (createShow) {
        confirmRef.current.classList.add("show");
      }
    };
    handleDisplay();
    useEffect(() => {}, [createShow]);
  
    const handleClose = () => {
      setActiveInput(null);
    //   setNewsId(null);
      confirmRef.current.classList.remove("show");
      setCreateShow(!createShow);
    };
    const handleChange = (e) => { 
          setObj({...obj,
          type: e.target.name,
          value: e.target.value,
        });
   }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
    //   console.log(obj);
      try{
        let res = await fetch("http://18.140.66.234/api/v1/news",{
          headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
          method:"POST",
          body:JSON.stringify({
            files: obj.thumbnail,
            content: obj.content,
            facultyCode: obj.facultyCode,
            shortDescription: obj.shortDescription,
            title: obj.title,
          }),
        });
        let resJson = await res.json();
        if( res.status === 200 ){
          setObj("");
          setMessenger("User created successfully");
          toast.successfully("successfully!")
        } else {
          setMessenger("Some error occured ");
          toast.error("error!")
        }
      } catch(err){
        console.log(err);
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
                  Tạo Tin tức
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
                  value = {obj.title}
                  onChange={(e)=>{
                    setObj((old)=>{
                      const newobj = {...obj,title:e.target.value};
                      return newobj
                    }) 
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
                    {news.title}
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
                    value = {obj.shortDescription}
                    onChange={(e)=>{
                      setObj((old)=>{
                        const newobj = {...obj,shortDescription:e.target.value};
                        return newobj
                      }) 
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                    type="text"
                    id="first_2"
                  />
                  <label className="font-[400] text-[11px]" htmlFor="first_2">
                    {news.shortDescription}
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
                    value = {obj.content}
                    onChange={(e)=>{
                      setObj((old)=>{
                        const newobj = {...obj,content:e.target.value};
                        return newobj
                      }) 
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="mb-[12px] px-[12px] w-[348px] h-full input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                    type="text"
                    id="first_3"
                  />
                  <label className="font-[400] text-[11px]" htmlFor="first_3">
                  </label>
                </div>
                <div
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

export default CreateNews