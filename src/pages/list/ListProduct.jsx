import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableSP from "../../components/datatable/DatatableProduct";

const ListProduct = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableSP />
      </div>
    </div>
  );
};

export default ListProduct;
