import React, { useRef, useEffect, useState } from "react";
import TeacherAPI from "../API/TeacherAPI";
import "./UpdateCustomer.scss";
import updateFormImg from "../assests/updateForm.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'react-uuid';
import axios from "axios";
const CreateCustomer = ({ createShow, setCreateShow, keyFresh, setKeyFresh }) => {
    const confirmRef = useRef();

    const [faculty,setFaculty] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    
    const [obj,setObj] = useState({})


    const getFaculty = async() => {
      const {data} = await axios.get("http://18.140.66.234/api/v1/faculties/all?status=true")
      setFaculty(data)
      console.log({data})
    }

    useEffect(() => {
      getFaculty()
    }, [])


  const handleDisplay = () => {
    if (createShow) {
      confirmRef.current.classList.add("show");
    }
  };
  handleDisplay();

  const handleClose = () => {
    setActiveInput(null);
    confirmRef.current.classList.remove("show");
    setCreateShow(!createShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var date = new Date();
	  var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ (date.getDate() > 9 ? date.getDate() : "0"+date.getDate());

    
const config = {
  headers: {
    "Content-Type": "application/json",
    "Content-Length": 285,
    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
  },
};
   
    try{
        await axios.post("http://18.140.66.234/api/v1/teachers", {
        address: obj.address,
        dob: current_date,
        email: obj.email,
        facultyCode: "FIT",
        gender: true,
        manager: true,
        name: obj.name,
        remark: "fsdf",
        password: obj.password,
        phone: obj.phone,
        roleCodes: [],
        userId: 'GV32837',}, config)

      
        setObj({});
        toast.success("Success!")
        setKeyFresh(old => old + 1)
       
    } catch(err){
      console.log(err)
    }


    handleClose();

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
              Chỉnh Sửa Thông Tin Giáo Viên
            </h1>
          </div>
        </div>
        <div className="border-b-[1px] border-black"></div>
        <div className="mb-[20px] flex flex-col justify-center mx-[20px]">
          {/*name + password */}
          <div className="flex justify-center items-center">
            <div
              className={` ${
                activeInput == "create_1" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">Họ Tên</h3>
              <input
                name="name"
                onFocus={(e) => {
                  setActiveInput(e.target.id);
                }}
                value = {obj.name}
                onChange={(e) => {
                  setObj((old) => {
                    const newObject = {...old, name: e.target.value}
                    return newObject
                  })
                }}
                onBlur={e => { setActiveInput(null);  }}
                className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                type="text"
                id="create_1"
              />
              <label className="font-[400] text-[11px]" htmlFor="create_1">
                VD: Nguyen Van A
              </label>
            </div>
            
            <div
              className={`${
                activeInput == "create_2" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">
                Số Điện Thoại
              </h3>
              <input
                name="phone"
                onFocus={(e) => {
                  setActiveInput(e.target.id);
                }}
                value={obj.phone}
                onChange={(e) => {
                  setObj((old) => {
                    const newObject = {...old, phone: e.target.value}
                    return newObject
                  })
                }}

                onBlur={e => { setActiveInput(null);  }}
                className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                type="text"
                id="create_2"
              />
              <label className="font-[400] text-[11px]" htmlFor="create_2">
                VD: 0389960079
              </label>
            </div>
          </div>
          {/*email + role */}
          <div className="flex justify-center items-center">
            <div
              className={` ${
                activeInput == "create_3" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">Email</h3>
              <input
              name="email"
                onFocus={(e) => {
                  setActiveInput(e.target.id);
                }}
                value={obj.email}
                onChange={(e) => {
                  setObj((old) => {
                    const newObject = {...old, email: e.target.value}
                    return newObject
                  })
                }}
                onBlur={e => { setActiveInput(null);  }}
                className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                type="email"
                id="create_3"
              />
              <label className="font-[400] text-[11px]" htmlFor="create_3">
                VD: example@example.com
              </label>
            </div>

            <div
              className={`${
                activeInput == "create_4" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">
                Khoa
              </h3>
              <select 
              onFocus={(e) => {
                setActiveInput(e.target.id)
              }}
              onChange={(e) => {
                setObj((old) => {
                  const newObject = {...old, facultyCode: e.target.value}
                  return newObject
                })
              }}
              className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]" name="" >
                {
                  faculty.map((item, i) => (
                    <option
                    key={i}
                    id="create_4"
                    value={item.code}>
                    {item.name}
                  </option>
                  ))
                }
              </select>
              <label className="font-[400] text-[11px]" htmlFor="create_4">
                Mặc định: Công Nghệ Thông Tin
              </label>
            </div>
          </div>
          {/*pass + address */}
          <div className="flex justify-center items-center">
            <div
              className={` ${
                activeInput == "create_6" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">Mật Khẩu</h3>
              <input
              name="password"
                onFocus={(e) => {
                  setActiveInput(e.target.id);
                }}
                value={obj.password}
                onChange={(e) => {
                  setObj((old) => {
                    const newObject = {...old, password: e.target.value}
                    return newObject
                  })
                }}
                onBlur={e => { setActiveInput(null);  }}
                className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                type="password"
                id="create_6"
              />
              <label className="font-[400] text-[11px]" htmlFor="create_6">
                VD: 12345678
              </label>
            </div>
            <div
              className={` ${
                activeInput == "create_5" && "active-input"
              } rounded-[3px] w-[369px] px-[10px] py-[12px] mt-[28px] flex flex-col justify-center items-start`}
            >
              <h3 className="mb-[12px] font-[600] text-[16px]">Địa chỉ</h3>
              <input
              name="address"
                onFocus={(e) => {
                  setActiveInput(e.target.id);
                }}
                value={obj.address}
                onChange={(e) => {
                  setObj((old) => {
                    const newObject = {...old, address: e.target.value}
                    return newObject
                  })
                }}
                onBlur={e => { setActiveInput(null);  }}
                className="mb-[12px] px-[12px] w-[348px] h-[40px] input-hover font-[14px] rounded-[4px] border-[1px] border-solid border-[rgba(0,0,0,0.4)]"
                type="text"
                id="create_5"
              />
              <label className="font-[400] text-[11px]" htmlFor="create_5">
                VD: Thành phố Hồ Chí Minh
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
  )
}

export default CreateCustomer