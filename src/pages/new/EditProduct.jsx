import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
const UpdateProduct = ({ inputs, title }) => {
  const [updatedData, setUpdatedData] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getProductById = async () => {
      try {
        const docRef = doc(db, "SanPham", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          setUpdatedData(productData);
        } else {
          console.log("Không tìm thấy sản phẩm với ID đã cho.");
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };
    getProductById();
  }, []);
  const handleInput = (event) => {
    setUpdatedData({
      ...updatedData, // Giữ lại tất cả các giá trị cũ
      [event.target.name]: event.target.value, // Lưu giá trị mới của input vào state
    });
  };
  console.log(updatedData);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "SanPham", productId);
      await updateDoc(docRef, {
        ...updatedData, // Lưu lại tất cả các giá trị mới
      });
      navigate("/products");
    } catch (e) {
      console.log(e);
      // Handle the error here
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div>
              <h2>Sửa sản phẩm: {productId}</h2>
              {/* Hiển thị giao diện để sửa sản phẩm */}
            </div>
            <img src={updatedData.hinhanh} alt="Product" />
          </div>
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.id}
                    placeholder={input.placeholder}
                    value={updatedData[input.id] || ""} // Lấy giá trị của input từ state
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
