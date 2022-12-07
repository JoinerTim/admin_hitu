import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import FacultyAPI from "../../API/FacultyAPI";
import { toast } from "react-toastify";
import FormFaculty from "./FormFaculty";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactLoading from "react-loading";

const Faculty = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [code, setCode] = useState(null);
  const [view, setView] = useState("");
  const [keyFresh, setKeyFresh] = useState(0)
  useEffect(() => {
    setLoading(true);
    FacultyAPI.getPageFaculty({ page: 1 })
      .then(({ data }) => {
        setTimeout(() => {
          setLoading(false);
        }, 375)
        setData(data.data);
      })
      .catch((e) => {
        toast.error("Có lỗi xảy ra");
      });
  }, [keyFresh]);
  const handleDelete = async (ids) => {
    try {
      await FacultyAPI.hiddenFaculty(ids);
      setKeyFresh(old => old + 1)
      toast.success("Xoá thành công");
    } catch (error) {
      toast.error("Xoá khoa thất bại");
    }
  };
  const columns = [
    {
      name: "Mã khoa",
      selector: (row) => row.code,
      sortable: true,
      width: "200px",
    },
    {
      name: "Tên khoa",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Chức Năng",
      selector: (row) => (
        <div className="action--item flex items-center justify-center relative">
          <button
            className="btn-action update-handle hover:scale-110 !bg-green-700 !font-medium !text-white"
            onClick={() => {
              setRowId(row.id);
              setCode(row.code);
              setView("UPDATE");
            }}
          >
            Sửa
          </button>
          <button
            className="btn-action delete-handle !font-medium hover:scale-110 !text-white !text-md"
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
      {!loading && 
      <DataTable
        title="Danh sách khoa"
        columns={columns}
        data={data}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        actions={
          <div>
            <button
              className="btn  flex !font-medium !text-xl !items-center justify-center  outline-none p-[10px] w-[90px] h-[40px] bg-[#29d21a] rounded-[5px] text-white mr-[15px]"
              onClick={() => {
                setView("ADD");
                setCode(null);
                setRowId(null);
              }}
            >
              Tạo
            </button>
          </div>
        }
        dense
      />}
      {view && (
        <FormFaculty
          code={code}
          id={rowId}
          setView={setView}
          view={view}
          setNewData={setData}
        />
      )}
      <Modal
        showCloseIcon={false}
        open={loading}
        onClose={() => {}}
        center={true}
        classNames={{
          overlay: "customOverlayLoading",
          modal: "customModalLoading",
        }}
      >
        <div className="flex justify-center items-center" style={{ width: "200px", height: "200px" }}>
          <ReactLoading
            type={"spinningBubbles"}
            color={"black"}
            height={"40%"}
            width={"40%"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Faculty;