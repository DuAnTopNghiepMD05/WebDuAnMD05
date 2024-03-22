import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
const UpdateProduct = ({ title }) => {
  const [updatedData, setUpdatedData] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  const [theloai, setTheloai] = useState([]);
  const productInputs = [
    {
      id: "tensp",
      label: "Tên sản phẩm",
      type: "text",
    },
    {
      id: "mota",
      label: "Mô tả",
      type: "text",
    },

    {
      id: "giatien",
      label: "Giá",
      type: "number",
    },
    {
      id: "soluong",
      label: "Số lượng",
      type: "number",
    },
    {
      id: "kichco",
      label: "Kích cỡ",
      type: "text",
    },
    {
      id: "mausac",
      label: "Màu sắc",
      type: "text",
    },
    {
      id: "type",
      label: "Định dạng",
      placeholder: "Min 1, Max 4",
      type: "number",
    },
    {
      id: "loaisp",
      label: "Loại sản phẩm",
      type: "select",
    },
  ];
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
    const fetchTheloai = async () => {
      const theloaiCollection = collection(db, "LoaiSP");
      const theloaiSnapshot = await getDocs(theloaiCollection);
      const theloaiList = theloaiSnapshot.docs.map((doc) => doc.data());
      setTheloai(theloaiList);
      console.log("Thể loại", theloaiList);
    };
    fetchTheloai();
  }, []);
  const handleInput = (event) => {
    let value = event.target.value;
    if (
      event.target.name === "soluong" ||
      event.target.name === "giatien" ||
      event.target.name === "type"
    ) {
      value = parseInt(value);
    }
    setUpdatedData({
      ...updatedData, // Giữ lại tất cả các giá trị cũ
      [event.target.name]: value, // Lưu giá trị mới của input vào state
    });
  };
  console.log(updatedData);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "SanPham", productId);
      await updateDoc(docRef, {
        soluong: parseInt(updatedData.soluong),
        giatien: parseInt(updatedData.giatien),
        type: parseInt(updatedData.type),
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

              {productInputs.map(
                (
                  input,
                  index // Hiển thị các input
                ) =>
                  input.type === "select" ? (
                    <div className="formInput" key={index}>
                      <label htmlFor={input.id}>{input.label}</label>
                      <select
                        name={input.id}
                        id={input.id}
                        onChange={handleInput}
                        value={updatedData[input.id]}
                      >
                        {theloai.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.tenloai}
                          </option> // Hiển thị danh sách thể loại
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="formInput" key={index}>
                      <label htmlFor={input.id}>{input.label}</label>
                      <input
                        type={input.type}
                        id={input.id}
                        name={input.id}
                        onChange={handleInput}
                        value={updatedData[input.id]} // Hiển thị các input còn lại
                      />
                    </div>
                  )
              )}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
