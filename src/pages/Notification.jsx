import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

import { getListNotification } from '../redux/toolskit/notificationSlice.js'
import UpdateNotification from './UpdateNotification';

const Notification = () =>{
  const [notification, setNotification] = useState([]);
  
  const dispatch = useDispatch();

  const [keyFresh, setKeyFresh] = useState(0);
  const [countSelected, setCountSelected] = useState(0);
  const [arrayId, setArrayId] = useState([]);

  const [updateShow, setUpdateShow] = useState(false)
  const [notificationId, setNotificationId] = useState(null)

  const getData = async () => {
    const data = await dispatch(getListNotification({page:1, size:10}));
    console.log(data.payload);
    setNotification(data.payload);
}

const handleDeleteNotification = async (row) => {
  try {
    await dispatch((row.id)).unwrap();
    setKeyFresh((oldv) => oldv + 1);
    toast.success("Tin tức vừa được xóa thành công");
    setCountSelected(0);
  } catch (error) {
    toast.error("Tin tức chưa được xóa!");
  }
};

const columns = [
  {
    name: "Ngày Tạo",
    selector: (row) => row.createdDate.slice(0,10),
    sortable: true,
    width:"250px"
  },
  {
    name: "Tác Giả",
    selector: (row) => row.createdBy,
    sortable: true,
    width:"100px"
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    width:"200px"
  },
  {
    name: "ShortDescription",
    selector: (row) => row.shortDescription,
    sortable: true,
    width:"500px"
  },
  {
    name: "Actions",
    selector: (row) => (
      <div className="action--item">
        <button
          className="btn-action update-handle"
          onClick={() => {
            setUpdateShow(true)
            setNotificationId(row.id)
          }}
        >
          Sửa
        </button>
        <button
          className="btn-action delete-handle"
          onClick={() => {
            handleDeleteNotification(row);
          }}
        >
          Xóa
        </button>
      </div>
    ),
  },
];
  useEffect(
    ()=>{
      getData()
    },[keyFresh]
  )
  return (
    <div className="col l-10 m-[30px_50px]">
      {
        <DataTable
          title="Danh sách tin tức"
          columns={columns}
          data={notification}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          selectableRows
          selectableRowsHighlight={false}
          actions={
            <div>
              <button className="btn" onClick="">
                Xóa (
                  ){" "}
              </button>
            </div>
          }
          dense
        />
      }
      <UpdateNotification updateShow={updateShow} setUpdateShow={setUpdateShow} notificationId={notificationId} setNotificationId={setNotificationId} keyFresh={keyFresh} setKeyFresh={setKeyFresh}/>
    </div>
  );
}

export default Notification;
