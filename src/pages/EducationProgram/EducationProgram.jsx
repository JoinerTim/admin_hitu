import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import EducationProgramAPI from "../../API/EducationProgramAPI";
import FormEducationProgram from "./FormEducationProgram";
import s from "./Table.module.css";
const EducationProgram = () => {
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [code, setCode] = useState(null);
  const [view, setView] = useState("");
  useEffect(() => {
    EducationProgramAPI.getPage({ page: 1 })
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, []);
  const handleDelete = async (ids) => {
    try {
      await EducationProgramAPI.hidden(ids);
      setData((d) => d.filter((e) => e.id !== ids));
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const columns = [
    {
      name: "Mã chương trình",
      selector: (row) => row.code,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tên chương trình",
      selector: (row) => row.name,
      sortable: true,
      width: "400px",
    },
    {
      name: "Chức Năng",
      selector: (row) => (
        <div className="action--item flex items-center justify-center relative">
          <Link
            className="p-2 hover:scale-110  hover:underline hover:text-blue-800 text-blue-500"
            to={"/education-program/" + row.code}
          >
            Xem môn học
          </Link>
          <button
            className={s.btnEdit}
            onClick={() => {
              setRowId(row.id);
              setCode(row.code);
              setView("UPDATE");
            }}
          >
            Sửa
          </button>
          <button
            className={s.btnDelete}
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="rounded-lg shadow-md col l-10 m-[30px_50px]">
      <DataTable
        title="Danh sách chương trình học"
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        actions={
          <div>
            <button
              className={s.btnAdd}
              onClick={() => {
                setView("ADD");
                setCode(null);
                setRowId(null);
              }}
            >
              Tạo chương trình
            </button>
          </div>
        }
        dense
      />
      {view && (
        <FormEducationProgram
          code={code}
          id={rowId}
          setView={setView}
          view={view}
          setNewData={setData}
        />
      )}
    </div>
  );
};

export default EducationProgram;
