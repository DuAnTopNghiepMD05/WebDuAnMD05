import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { SpColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const DatatableProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "SanPham"));
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
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
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
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
      <div className="datatableTitle">
        Add New User
        <Link to="/products" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        getRowId={(row) =>
          row.id || row.tensp + row.type + row.kichco + row.loaisp + row.img
        }
        columns={SpColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableProduct;
