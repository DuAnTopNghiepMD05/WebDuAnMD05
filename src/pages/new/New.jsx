import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState("");
  const [percent, setPercent] = useState(null);
  const navigate = useNavigate();
  const [theloai, setTheloai] = useState([]);

  useEffect(() => {
    const uploadFile = async () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercent(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, hinhanh: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
    const fetchTheloai = async () => {
      const theloaiCollection = collection(db, "LoaiSP");
      const theloaiSnapshot = await getDocs(theloaiCollection);
      const theloaiList = theloaiSnapshot.docs.map((doc) => doc.data());
      setTheloai(theloaiList);
      console.log("Thể loại", theloaiList);
    };
    fetchTheloai();
  }, [file]);

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
  const handleInput = (e) => {
    const id = e.target.id;
    let value = e.target.value;
    if (id === "giatien" || id === "soluong" || id === "type")
      value = parseInt(value);
    setData({ ...data, [id]: value });
  };
  console.log(data);
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(collection(db, "SanPham")); // Creates a new document reference
      await setDoc(docRef, {
        ...data,
        id: null,
        idsp: null,
      });
      navigate("/products");
    } catch (err) {
      console.log(err);
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
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input, index) =>
                input.type === "select" ? (
                  <div key={index} className="formInput">
                    <label htmlFor={input.id}>{input.label}</label>
                    <select id={input.id} onChange={handleInput}>
                      {theloai.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.tenloai}
                        </option>
                      ))}
                      {/* Nếu type = select map qua từng option */}
                    </select>
                  </div>
                ) : (
                  <div key={index} className="formInput">
                    <label htmlFor={input.id}>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      onChange={handleInput}
                    />
                    {/* Nếu type != select map qua từng option khác */}
                  </div>
                )
              )}
              <button disabled={percent != null && percent < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
