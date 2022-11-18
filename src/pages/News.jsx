import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

import { getListNews } from '../redux/toolskit/newsSlice'

// import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
// import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

const News = () =>{
  const [news, setNews] = useState([]);
  
  const dispatch = useDispatch();
  const history = useNavigate();
  const getData = async () => {
    const data = await dispatch(getListNews({page:1, size:10}));
    console.log(data.payload);
    setNews(data.payload);
}
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
      <div className="action--item flex align-center">
        <button
          className="btn"
          onClick={() => {
            history(`/dashboard/update/user/${row.id}`);
          }}
        >
          Sửa
        </button>
        <hr/>
        <button
          className="btn"
          onClick={() => {
            // handleDeleteUser(row);
          }}
        >
          Xóa
        </button>
      </div>
    ),
    width:"300px"
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
