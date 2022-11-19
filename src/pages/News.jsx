import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

import { getListNews } from '../redux/toolskit/newsSlice'
import UpdateNews from './UpdateNews';


// import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
// import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

const News = () =>{
  const [news, setNews] = useState([]);
  
  const dispatch = useDispatch();
  const history = useNavigate();

  const [keyFresh, setKeyFresh] = useState(0);
  const [countSelected, setCountSelected] = useState(0);
  const [arrayId, setArrayId] = useState([]);

  const [updateShow, setUpdateShow] = useState(false)
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
    name: "Id",
    selector: (row) => row.id,
    width:"50px"
  },
  {
    name: "Ngày Tạo",
    selector: (row) => row.createdDate,
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
  // {
  //   name: "Content",
  //   selector: (row) => row.content,
  //   sortable: true,
  //   width:"500px"
  // },
  {
    name: "ShortDescription",
    selector: (row) => row.shortDescription,
    sortable: true,
    width:"500px"
  },
  
  // {
  //   name: "Status",
  //   selector: (row) => row.status,
  //   sortable: true,
  //   width:"100px"
  // },
  // {
  //   name: "Thumbnail",
  //   selector: (row) => row.thumbnail,
  //   sortable: true,
  //   width:"500px"
  // },
  
  {
    name: "Actions",
    selector: (row) => (
      <div className="action--item">
        <button
          className="btn-action update-handle"
          onClick={() => {
            // history(`/dashboard/update/user/${row.id}`);
            setUpdateShow(true)
            setNewsId(row.userId)
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
    },[]
  )
  return (
    <div className="col l-10 m-[30px_50px]">
      {
        // <DataTableExtensions {...tableData} >
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
              <button className="btn" onClick="">
                Xóa (
                  {/* {countSelected} */}
                  ){" "}
              </button>
            </div>
          }
          dense
        />
        // </DataTableExtensions>
      }
      {/* {loading && <Loader />} */}
      <UpdateNews updateShow={updateShow} setUpdateShow={setUpdateShow} newsId={newsId} setNewsId={setNewsId}/>
    </div>
  );
}
// eslint-disable-next-line react/destructuring-assignment
// const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

// const Scheduler = () => {
//   const [scheduleObj, setScheduleObj] = useState();

//   const change = (args) => {
//     scheduleObj.selectedDate = args.value;
//     scheduleObj.dataBind();
//   };

//   const onDragStart = (arg) => {
//     // eslint-disable-next-line no-param-reassign
//     arg.navigation.enable = true;
//   };

export default News;
