import React, { useRef, useEffect, useState } from "react";
import TeacherAPI from "../API/TeacherAPI";
import "./UpdateCustomer.scss";
import updateFormImg from "../assests/updateForm.png";

const UpdateCustomer = ({ updateShow, setUpdateShow, userId, setUserId }) => {
  const confirmRef = useRef();

  const [teacher, setTeacher] = useState({});
  const [activeInput, setActiveInput] = useState(null);

  const [message,setMessenger] = useState('');
  const [obj,setObj] = useState({
    name:teacher.name,
    address:teacher.address,
    email:teacher.email,
    phone:teacher.phone
  })

  const getTeacherData = async (userId) => {
    const { data } = await TeacherAPI.getSingleTeacher(userId);
    console.log(data);
    setTeacher(data);
  };

  // const updateTeacherData = async (userId) => {

  // }
    
  // }
  useEffect(() => {
    if (userId) {
      getTeacherData(userId);
    }
  }, [userId]);




  const handleDisplay = () => {
    if (updateShow) {
      confirmRef.current.classList.add("show");
    }
  };
  handleDisplay();
  useEffect(() => {}, [updateShow]);

  const handleClose = () => {
    setActiveInput(null);
    setUserId(null);
    confirmRef.current.classList.remove("show");
    setUpdateShow(!updateShow);
  };
  const handleChange = (e) => {

    let value= e.target.value;
    let name = e.target.name;
    
    setObj((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    });
    

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let res = await fetch("http://18.140.66.234/api/v1/teachers",{
        method:"PUT",
        body:JSON.stringify({
          name:obj.name,
          email:obj.email,
          phone:obj.phone,
          address:obj.address
        }),
      });
      let resJson = await res.json();
      if( res.status === 200 ){
        setObj("");
        setMessenger("User created successfully");
      } else {
        setMessenger("Some error occured ");
      }
    } catch(err){
      console.log(err);
    }

    // console.log(obj);

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
                Chỉnh Sửa Thông Tin Giáo Viênnnn
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
                <h3 className="mb-[12px] font-[500] text-[16px]">Họ Tên</h3>
                <input
                name="name"
                  onFocus={(e) => {
                    setActiveInput(e.target.id);
                  }}
                  placeholder = {teacher.name}
                  onChange = {handleChange}
                  onBlur={e => { setActiveInput(null);  }}
                  className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                  type="text"
                  id="first_1"
                />
                <label className="font-[400] text-[11px]" htmlFor="first_1">
                  Nguyen Van A
                </label>
              </div>
              <div
                className={`${
                  activeInput == "first_2" && "active-input"
                } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
              >
                <h3 className="mb-[12px] font-[500] text-[16px]">
                  Số Điện Thoại
                </h3>
                <input
                  name="phone"
                  onFocus={(e) => {
                    setActiveInput(e.target.id);
                  }}
                  placeholder={teacher.phone}
                  onChange = {handleChange}
                  onBlur={e => { setActiveInput(null);  }}
                  className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                  type="text"
                  id="first_2"
                />
                <label className="font-[400] text-[11px]" htmlFor="first_2">
                  0389960079
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div
                className={` ${
                  activeInput == "first_3" && "active-input"
                } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
              >
                <h3 className="mb-[12px] font-[500] text-[16px]">Email</h3>
                <input
                name="email"
                  onFocus={(e) => {
                    setActiveInput(e.target.id);
                  }}
                  placeholder={teacher.email}
                  onChange = {handleChange}
                  onBlur={e => { setActiveInput(null);  }}
                  className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                  type="text"
                  id="first_3"
                />
                <label className="font-[400] text-[11px]" htmlFor="first_3">
                  example@example.com
                </label>
              </div>
              <div
                className={`${
                  activeInput == "first_4" && "active-input"
                } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
              >
                <h3 className="mb-[12px] font-[500] text-[16px]">
                  Chức vụ
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
                  Giảng Viên
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div
                className={` ${
                  activeInput == "first_5" && "active-input"
                } rounded-[3px] w-[738px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
              >
                <h3 className="mb-[12px] font-[500] text-[16px]">Địa chỉ</h3>
                <input
                name="address"
                  onFocus={(e) => {
                    setActiveInput(e.target.id);
                  }}
                  placeholder={teacher.address}
                  onChange = {handleChange}
                  onBlur={e => { setActiveInput(null);  }}
                  className="mb-[12px] px-[12px] w-[716px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                  type="text"
                  id="first_5"
                />
                <label className="font-[400] text-[11px]" htmlFor="first_5">
                  Thành phố Hồ Chí Minh
                </label>
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

export default UpdateCustomer;
