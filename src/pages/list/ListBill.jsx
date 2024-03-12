import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableBill from "../../components/datatable/DatatableBill";

const ListBill = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableBill />
      </div>
    </div>
  );
};

export default ListBill;
