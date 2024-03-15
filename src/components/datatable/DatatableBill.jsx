import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { BillColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DatatableBill = () => {
  const [data, setData] = useState([]);

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
        columns={BillColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableBill;
