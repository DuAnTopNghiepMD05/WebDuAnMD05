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
  const { userId, profileId } = useParams();
  const navigate = useNavigate();
  const [editableField, setEditableField] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (userId && profileId) {
      console.log(`User ${userId}, Profile ${profileId} is being accessed`);

      const getUserProfileById = async () => {
        try {
          // Lấy thông tin người dùng
          const userDocRef = doc(db, "thongtinUser", userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("Thông tin người dùng:", userData);

            // Lấy thông tin profile cụ thể dựa vào profileId
            const profileDocRef = doc(db, "thongtinUser", userId, "Profile", profileId);
            const profileDocSnap = await getDoc(profileDocRef);

            if (profileDocSnap.exists()) {
              const profileData = profileDocSnap.data();
              setUpdatedData({ ...userData, ...profileData });


            } else {
              console.log("Không tìm thấy profile với Profile ID đã cho.");
            }
          } else {
            console.log("Không tìm thấy người dùng với User ID đã cho.");
          }
        } catch (error) {
          console.log("Lỗi khi lấy dữ liệu:", error);
        }
      };
      getUserProfileById();
    }
  }, [userId, profileId]); // Thêm profileId vào danh sách dependencies



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
        avatar: response.data.data.url, // Update the image URL in the state
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

    if (name === 'ngaysinh') {
      const formattedValue = value.split('-').reverse().join('/'); // Chuyển đổi định dạng
      setUpdatedData(prev => ({ ...prev, [name]: formattedValue }));
    } else {

      setUpdatedData(prev => ({ ...prev, [name]: value }));
    }
    console.log("updatedData: " + String(updatedValue));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "thongtinUser", userId, "Profile", profileId);

      await updateDoc(docRef, {
        ...updatedData,
      });
      navigate("/users");
      console.log(" updating data: ", updatedData);
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
                <img src={updatedData.avatar || 'path/to/default/image.jpg'} alt="Avatar" className="itemImg" />
                <div className="formInput" style={{ position: "absolute", marginTop: "110px", marginLeft: "35px" }}>
                  <label htmlFor="file">
                    <DriveFolderUploadOutlinedIcon className="icon" style={{ color: "red" }} />
                  </label>
                  <input type="file" id="file" name="img" onChange={handleImageChange} style={{ display: "none" }} />
                </div>
                <div className="details">
                  <h1 className="itemTitle">{updatedData?.hoten}</h1>
                  <div class="custom-radios">
                    <div>
                      <input
                        type="radio"
                        id="color-1"
                        name="status"
                        value="active"
                        checked={updatedData.status === "active"}
                        onChange={handleInput}
                      />
                      <label for="color-1">
                        <span>
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                        </span>
                      </label>
                    </div>

                    <div>
                     
                      <input
                        type="radio"
                        id="color-3"
                        name="status"
                        value="pending"
                        checked={updatedData.status === "pending"}
                        onChange={handleInput}
                      />
                      <label for="color-3">
                        <span>
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                        </span>
                      </label>
                    </div>

                    <div>
                    <input
                        type="radio"
                        id="color-4"
                        name="status"
                        value="passive"
                        checked={updatedData.status === "passive"}
                        onChange={handleInput}
                      />
                      <label for="color-4">
                        <span>
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                        </span>
                      </label>
                    </div>
                  </div>
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
                    <span className="itemKey">Giới tính:</span>
                    {editableField === 'gioitinh' ? (
                      <select
                        value={updatedData.gioitinh || ''}
                        name="gioitinh"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="chưa có thông tin!">Other</option>
                      </select>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData.gioitinh}</span>
                        <EditIcon onClick={() => setEditableField('gioitinh')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>


                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    {editableField === 'sdt' ? (
                      <input
                        type="sdt"
                        value={updatedData?.sdt || ''}
                        name="sdt"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData?.sdt}</span>
                        <EditIcon onClick={() => setEditableField('sdt')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Ngày sinh:</span>
                    {editableField === 'ngaysinh' ? (
                      <input
                        type="date" // Thay đổi ở đây từ "ngaysinh" thành "date"
                        value={updatedData?.ngaysinh.split('/').reverse().join('-') || ''}
                        name="ngaysinh"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // Dừng chỉnh sửa khi input mất focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData?.ngaysinh}</span>
                        <EditIcon onClick={() => setEditableField('ngaysinh')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    {editableField === 'diachi' ? (
                      <input
                        type="diachi"
                        value={updatedData?.diachi || ''}
                        name="diachi"
                        onChange={handleInput}
                        onBlur={() => setEditableField(null)} // To stop editing when the input loses focus
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="itemValue">{updatedData?.diachi}</span>
                        <EditIcon onClick={() => setEditableField('diachi')} style={{ marginLeft: '10px', cursor: 'pointer', fontSize: "20px", color: "red" }} />
                      </div>
                    )}
                  </div>

                </div>
              </div>

              <button type="submit" onClick={handleUpdate} className="button-update" disabled={isUploading || !updatedData.avatar}>
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
