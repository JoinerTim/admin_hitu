import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DataTable from "react-data-table-component";
import "../scss/main.scss";
import {getListTeacherPerPage} from '../../redux/toolskit/userSlice'
import UpdateCustomer from './UpdateTeacher';
import ConfirmDelete from '../Services/ConfirmDelete';
import CreateCustomer from './CreateTeacher';
import { toast } from "react-toastify";


const Teachers = () => {
  const dispatch = useDispatch();

  const {data: users} = useSelector(state => state.userState)


  const [keyFresh, setKeyFresh] = useState(0)

  const [updateShow, setUpdateShow] = useState(false)
  const [createShow, setCreateShow] = useState(false)

  const [deleteShow, setDeleteShow] = useState(false)

  const [userId, setUserId] = useState(null)
  const [rowId, setRowId] = useState(null)


  const getData = async () => {
        await dispatch(getListTeacherPerPage({page: 1, size: 10}));
      }

  useEffect(() => {
    getData();
  }, [keyFresh]);

  const handleCreate = () => {
    setCreateShow(true)
  }

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://18.140.66.234/api/v1/teachers/toggle-status?ids=${id}`, {method: "PUT"})
      setKeyFresh(old => old + 1)
      toast.success("Người dùng vừa được xóa thành công");
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
      name: "Chức năng",
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
              setRowId(row.id)
              setDeleteShow(true)
              // handleDeleteUser(row);
            }}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

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
          // selectableRows
          selectableRowsHighlight={false}
          // onSelectedRowsChange={handleSelectedChange}
          actions={
            <div>
              <button className="btn flex items-center justify-center  outline-none p-[10px] w-[90px] h-[40px] bg-[#29d21a] rounded-[5px] text-white mr-[15px]" onClick={handleCreate}>
                Tạo
              </button>
            </div>
          }
          dense
        />
        // </DataTableExtensions>
      }
      <UpdateCustomer updateShow={updateShow} setUpdateShow={setUpdateShow} userId={userId} setUserId={setUserId} keyFresh={keyFresh} setKeyFresh={setKeyFresh}/>
      <CreateCustomer createShow={createShow} setCreateShow={setCreateShow} keyFresh={keyFresh} setKeyFresh={setKeyFresh}/>
      <ConfirmDelete onClick={() => {handleDeleteUser(rowId)}} deleteShow={deleteShow} setDeleteShow={setDeleteShow} />
    </div>
  );
};


export default Teachers;
