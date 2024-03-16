import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const EditCategory = ({ inputs, title }) => {
  const [categoryData, setCategoryData] = useState({});
  const navigate = useNavigate();
  const { categoryId } = useParams(); //trùng với tên trong file App.js
  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const docRef = doc(db, "LoaiSP", categoryId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const catData = docSnap.data();
          setCategoryData(catData);
        } else {
          console.log("Không tìm thấy danh mục với ID đã cho.");
        }
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu sản phẩm:", e);
      }
    };
    getCategoryById();
  }, []);

  const handleCategoryInput = (e) => {
    const value = e.target.value;
    setCategoryData({ ...categoryData, [e.target.id]: value });
    //[e.target.id] là key, value là value
    //key là id của input, value là giá trị của input
  };
  console.log(categoryData);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "LoaiSP", categoryId);
      await updateDoc(docRef, {
        ...categoryData,
      });
      navigate("/categories");
    } catch (e) {
      console.log(e);
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
              <h2>Sửa danh mục: {categoryId}</h2>
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleUpdate}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={handleCategoryInput}
                    value={categoryData[input.id]}
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

export default EditCategory;
