import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatablestatistic from "../../components/datatable/Datatablestatistic";

const Liststatistic = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatablestatistic />
      </div>
    </div>
  );
};

export default Liststatistic;
