import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DatatableBill = () => {
  const [data, setData] = useState([]);
  const BillColumnss = [
    {
      field: "hoten",
      headerName: "Họ tên",
      width: 140,
    },
    {
      field: "diachi",
      headerName: "Địa chỉ",
      width: 140,
    },

    {
      field: "ngaydat",
      headerName: "Ngày đặt",
      width: 100,
    },
    {
      field: "sdt",
      headerName: " Số điện thoại",
      width: 120,
    },
    {
      field: "tongtien",
      headerName: "Tổng tiền",
      width: 160,
    },
    {
      field: "phuongthuc",
      headerName: "Phương thức thanh toán",
      width: 220,
      // renderCell: (params) => {
      //   return <div className={`cellWithStatus ${params.row.status}`}></div>;
      // },
    },

    {
      field: "trangthai",
      headerName: "Trạng thái",
      width: 160,
      renderCell: (params) => {
        let bgColor;
        let color;
        switch (params.value) {
          case 1:
          case 2:
            bgColor = "rgba(255, 217, 0, 0.05)";
            color = "goldenrod";
            break;
          case 3:
            bgColor = "rgba(0, 128, 0, 0.05)";
            color = "green";
            break;
          case 4:
            bgColor = "rgba(255, 0, 0, 0.05)";
            color = "red";
            break;
          default:
            bgColor = "white";
        }

        return (
          <select
            value={params.value}
            onChange={(event) =>
              handleStatusChange(params.row.id, event.target.value)
            }
            style={{
              backgroundColor: bgColor,
              color: color,
              fontWeight: "bold",
            }}
          >
            <option value="1">Đang xử lý</option>
            <option value="2">Đang giao hàng</option>
            <option value="3">Giao hàng thành công</option>
            <option value="4">Hủy Đơn hàng</option>
          </select>
        );
      },
    },
  ];
  const handleStatusChange = async (id, newStatus) => {
    // Find the row with the given id
    newStatus = parseInt(newStatus);
    const row = data.find((row) => row.id === id);

    if (row) {
      // Update the status of the row
      row.trangthai = newStatus;

      // Update the state
      setData([...data]);

      // Update the document in Firestore
      await updateDoc(doc(db, "HoaDon", id), {
        trangthai: newStatus,
      });
    } else {
      // Log a message indicating that no row was found with the given id
      console.log(`No row found with id: ${id}`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "HoaDon"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });

          console.log(doc.id, " => ", doc.data());
        });
        setData(list);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={BillColumnss}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableBill;
