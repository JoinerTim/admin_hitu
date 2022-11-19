import React, {useEffect, useState} from 'react';
// import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./Customers.scss";
import {getListTeacherPerPage, deleteSingleUser, deleteMutipleUser} from '../redux/toolskit/userSlice'
import UpdateCustomer from './UpdateCustomer';

const DashboardUsers = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  const {data: users} = useSelector(state => state.userState)


  const [keyFresh, setKeyFresh] = useState(0);
  const [countSelected, setCountSelected] = useState(0);
  const [arrayId, setArrayId] = useState([]);

  const [updateShow, setUpdateShow] = useState(false)
  const [userId, setUserId] = useState(null)

  const getData = async () => {
        await dispatch(getListTeacherPerPage({page: 1, size: 10}));
      }

  useEffect(() => {
    getData();
  }, [keyFresh]);

  const handleDeleteUser = async (row) => {
    try {
      await dispatch(deleteSingleUser(row.id)).unwrap();
      setKeyFresh((oldv) => oldv + 1);
      toast.success("Người dùng vừa được xóa thành công");
      setCountSelected(0);
    } catch (error) {
      toast.error("Người dùng chưa được xóa!");
    }
  };

  const columns = [
    {
      name: "Tên",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      sortable: true,
      name: "Số điện thoại",
      selector: (row) => row.phone,
    },
    {
      sortable: true,
      name: "Địa chỉ",
      selector: (row) => row.address,
    },
    {
      sortable: true,
      name: "Khoa",
      selector: (row) => row.facultyName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Tham gia lúc",
      selector: (row) => row.createdDate.toString().slice(0,10),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="action--item">
          <button
            className="btn-action update-handle"
            onClick={() => {
              // history(`/dashboard/update/user/${row.id}`);
              setUpdateShow(true)
              setUserId(row.userId)
            }}
          >
            Sửa
          </button>
          <button
            className="btn-action delete-handle"
            onClick={() => {
              handleDeleteUser(row);
            }}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data: users,
  };

  const handleSelectedChange = (state) => {
    setCountSelected(state.selectedCount);
    let array = [];
    state.selectedRows.forEach((item, i) => {
      array.push(item._id);
    });
    setArrayId(array);
  };

  const handleDeleteMutiple = async () => {
    try {
      await dispatch(deleteMutipleUser({ id: arrayId })).unwrap();
      setKeyFresh((oldv) => oldv + 1);
      toast.success("Người dùng vừa được xóa thành công");

      setCountSelected(0);
    } catch (error) {
      toast.error("Người dùng chưa được xóa!");
    }
  };
  return (
    <div className="col l-10 m-[30px_50px]">
      {
        // <DataTableExtensions {...tableData} >
        <DataTable
          title="Danh sách giáo viên"
          columns={columns}
          data={users}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          selectableRows
          selectableRowsHighlight={false}
          onSelectedRowsChange={handleSelectedChange}
          actions={
            <div>
              <button className="btn" onClick={handleDeleteMutiple}>
                Xóa ({countSelected}){" "}
              </button>
            </div>
          }
          dense
        />
        // </DataTableExtensions>
      }
      <UpdateCustomer updateShow={updateShow} setUpdateShow={setUpdateShow} userId={userId} setUserId={setUserId}/>
    </div>
  );
};

export default DashboardUsers;
