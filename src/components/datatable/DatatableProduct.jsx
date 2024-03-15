import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { SpColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const DatatableProduct = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "SanPham"));
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
  // console.log(data);
  const handleDelete = async (sid) => {
    try {
      await deleteDoc(doc(db, "SanPham", sid));
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
              to={`/products/${params.row.sid}`}
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
      <div className="datatableTitle">
        Add New Product
        <Link to="/products/new" className="link">
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
