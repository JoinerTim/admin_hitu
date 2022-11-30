import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

import { getListNews } from '../redux/toolskit/newsSlice'
import UpdateNews from './UpdateNews';
import CreateNews from './CreateNews';

const News = () =>{
  const [news, setNews] = useState([]);
  
  const dispatch = useDispatch();

  const [keyFresh, setKeyFresh] = useState(0);
  const [countSelected, setCountSelected] = useState(0);
  const [arrayId, setArrayId] = useState([]);

  const [updateShow, setUpdateShow] = useState(false)
  const [createShow, setCreateShow] = useState(false)
  const [newsId, setNewsId] = useState(null)

  const getData = async () => {
    const data = await dispatch(getListNews({page:1, size:10}));
    console.log(data.payload);
    setNews(data.payload);
}

const handleDeleteNews = async (row) => {
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
            setNewsId(row.id)
          }}
        >
          Sửa
        </button>
        <button
          className="btn-action delete-handle"
          onClick={() => {
            handleDeleteNews(row);
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
          data={news}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          selectableRows
          selectableRowsHighlight={false}
          // onSelectedRowsChange={handleSelectedChange}
          actions={

            <div>
              <button className="btn" onClick={()=>{setCreateShow(true)}}>
                Tạo {" "}
              </button>
            </div>
            
          }
          dense
        />
      }
      <UpdateNews updateShow={updateShow} setUpdateShow={setUpdateShow} newsId={newsId} setNewsId={setNewsId} keyFresh={keyFresh} setKeyFresh={setKeyFresh}/>
      <CreateNews createShow={createShow} setCreateShow={setCreateShow} keyFresh={keyFresh} setKeyFresh={setKeyFresh}/>
    </div>
  );
}

export default News;
