import React, { useRef, useEffect, useState } from "react";
import NewsAPI from "../API/NewsAPI";
import "./UpdateNews.scss";
import updateFormImg from "../assests/updateForm.png";

const UpdateNews = ({ updateShow, setUpdateShow, newsId, setNewsId }) => {
    const confirmRef = useRef();

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
      const { data } = await NewsAPI.getPageNewsAPI(newsId);
      console.log(data);
      setNews(data);
    };
    useEffect(() => {
      if (newsId) {
        getNewsData(newsId);
      }
    }, [newsId]);
  



    const handleDisplay = () => {
      if (updateShow) {
        confirmRef.current.classList.add("show");
      }
    };
    handleDisplay();
    useEffect(() => {}, [updateShow]);
  
    const handleClose = () => {
      setActiveInput(null);
      setNewsId(null);
      confirmRef.current.classList.remove("show");
      setUpdateShow(!updateShow);
    };
    const handleChange = (e) => { 
          setObj({
          type: e.target.name,
          value: e.target.value,
          
        });
   }
  
    const handleSubmit = (e) => {
      e.preventDefault()

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
                  Chỉnh Sửa Tin tức
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
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
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
                  <input
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
                    }}
                    onBlur={e => { setActiveInput(null);  }}
                    className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
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
                  <h3 className="mb-[12px] font-[500] text-[16px]">
                    Thumbnail
                  </h3>
                  <input
                    onFocus={(e) => {
                      setActiveInput(e.target.id);
                    }}
                    onBlur={e => { setActiveInput(null);  }}
  
                    className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                    type="text"
                    id="first_4"
                  />
                  <label className="font-[400] text-[11px]" htmlFor="first_4">
                  </label>
                </div>
              </div>  
            </div>
            <div className="border-b-[1px] border-black"></div>
            <div className="flex justify-center items-center text-center">
              <button onClick={handleSubmit} className="btn-set-css min-w-[180px] my-[20px] rounded-[3px]  h-[50px] p-[10px] font-[900] text-[15px] border-[1px] border-[rgb(216, 65, 48)]">Submit</button>
              <button onClick={handleClose} className="btn-set-css min-w-[180px] my-[20px] rounded-[3px]  h-[50px] p-[10px] font-[900] text-[15px] border-[1px] border-[rgb(216, 65, 48)]">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default UpdateNews