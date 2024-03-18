import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';


const EditUser = ({ inputs, title }) => {
  const [updatedData, setUpdatedData] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();
  const [editableField, setEditableField] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (userId) {

      const getUserById = async () => {
        try {
          const docRef = doc(db, "thongtinUser", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUpdatedData(userData);
          } else {
            console.log("Không tìm thấy người dùng với ID đã cho.");
          }
        } catch (error) {
          console.log("Lỗi khi lấy dữ liệu người dùng:", error);
        }
      };
      getUserById();
    }
  }, [userId]);

  const uploadImage = async (file) => {
    setIsUploading(true); // Start upload
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "e2dd9766d744919511eb431d7d431285");

    try {
      const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded, URL:", response.data.data.url);

      setUpdatedData(prev => ({
        ...prev,
        img: response.data.data.url, // Update the image URL in the state
      }));
      setIsUploading(false); // End upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false); // End upload on error too
      window.alert("Lỗi upload ảnh hãy thử lại sau!"); 
    }
  };


  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      uploadImage(event.target.files[0]);
    }
  };

  const handleInput = (event) => {
    const { name, value, type } = event.target;
    const updatedValue = type === 'number' ? Number(value) : value;

    setUpdatedData(prevState => ({
      ...prevState,
      [name]: updatedValue,
    }));
    console.log("updatedData: " + String(updatedValue));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "thongtinUser", userId);
      await updateDoc(docRef, {
        ...updatedData,
      });
      navigate("/users");
    } catch (error) {
      console.log("Lỗi khi cập nhật dữ liệu người dùng:", error);
    }
  };


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">

          <div className="left">
            <div className="editButton" style={{ fontSize: "20px" }}></div>
            <h1 className="title">Thông tin</h1>
            <form className="form" onSubmit={handleUpdate}>
              <div className="item">
                <img src={updatedData.img || 'path/to/default/image.jpg'} alt="Avatar" className="itemImg" />
                <div className="formInput" style={{ position: "absolute", marginTop: "110px", marginLeft: "35px" }}>
                  <label htmlFor="file">
                    <DriveFolderUploadOutlinedIcon className="icon" style={{color:"red"}} />
                  </label>
                  <input type="file" id="file" name="img" onChange={handleImageChange} style={{ display: "none" }} />
                </div>
                <div className="details">
                  <h1 className="itemTitle">{updatedData?.fullname}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    {editableField === 'email' ? (
                      <input
                        type="email"
                        value={updatedData.email || ''}
                        name="email"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData.email}</span>
                        <EditIcon onClick={() => setEditableField('email')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    {editableField === 'phone' ? (
                      <input
                        type="phone"
                        value={updatedData?.phone || ''}
                        name="phone"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData?.phone}</span>
                        <EditIcon onClick={() => setEditableField('phone')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    {editableField === 'address' ? (
                      <input
                        type="address"
                        value={updatedData?.address || ''}
                        name="address"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData?.address}</span>
                        <EditIcon onClick={() => setEditableField('address')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    {editableField === 'country' ? (
                      <input
                        type="country"
                        value={updatedData?.country || ''}
                        name="country"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData?.country}</span>
                        <EditIcon onClick={() => setEditableField('country')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="button-update" disabled={isUploading || !updatedData.img}>
                {isUploading ? "Loading..." : "Update"}
              </button>


            </form>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
