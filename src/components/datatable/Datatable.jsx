import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "thongtinUser"));
        querySnapshot.forEach((doc) => {
          list.push({ sid: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });

        setData(list);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (sid) => {
    try {
      await deleteDoc(doc(db, "thongtinUser", sid));
      setData(data.filter((item) => item.sid !== sid));
    } catch (e) {
      console.log(e);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.sid}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => {
                console.log(params.row);
                handleDelete(params.row.sid);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.sid} // Sử dụng sid làm id cho mỗi hàng
      />

    </div>
  );
};

export default Datatable;
