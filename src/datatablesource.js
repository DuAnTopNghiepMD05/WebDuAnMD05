export const userColumns = [
  { field: "uid", headerName: "ID", width: 200 },
  {
    field: "user",
    headerName: "User",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
         
        </div>
      );
    },
  },
  {
    field: "hoten",
    headerName: "Họ và tên",
    width: 230,
  },

  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "ngaysinh",
    headerName: "Tuổi",
    width: 100,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const BillColumns = [
  {
    field: "hoten",
    headerName: "Họ tên",
    width: 140,
  },
  {
    field: "diachi",
    headerName: "Địa chỉ",
    width: 140,
  },

  {
    field: "ngaydat",
    headerName: "Ngày đặt",
    width: 100,
  },
  {
    field: "sdt",
    headerName: " Số điện thoại",
    width: 120,
  },
  {
    field: "tongtien",
    headerName: "Tổng tiền",
    width: 160,
  },
  {
    field: "phuongthuc",
    headerName: "Phương thức thanh toán",
    width: 220,
    // renderCell: (params) => {
    //   return <div className={`cellWithStatus ${params.row.status}`}></div>;
    // },
  },
  {
    field: "trangthai",
    headerName: "Trạng thái",
    width: 180,
    renderCell: (params) => {
      return (
        <select value={params.value}>
          <option value="1">Đang xử lý</option>
          <option value="2">Đang giao hàng</option>
          <option value="3">Giao hàng thành công</option>
          <option value="4">Hủy Đơn hàng</option>
        </select>
      );
    },
  },
];
export const categoriesRows = [
  {
    field: "id",
    headerName: "Id",
    width: 200,
  },
  {
    field: "tenloai",
    headerName: "Loại sản phẩm",
    width: 160,
  },
];
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
export const statisticRows = [
  {
    field: "id",
    headerName: "ID",
    width: 100, 
  },
  {
    field: "ngay",
    headerName: "Ngày",
    width: 200, 
  },
  {
    field: "loaisp",
    headerName: "Loại sản phẩm",
    width: 200,
  },
  {
    field: "tensp",
    headerName: "Tên sản phẩm",
    width: 160,
  },
  {
    field: "soluong",
    headerName: "Số lượng",
    width: 160,
  },
  {
    field: "giamgia",
    headerName: "Giảm giá",
    width: 160,
  },
  {
    field: "doanhthu",
    headerName: "Doanh thu",
    width: 160,
    groupable: false,
    type: "number",
    valueFormatter: (value) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  }
];
//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
export const SpColumns = [
  {
    field: "tensp",
    headerName: "Tên sản phẩm",
    width: 200,
  },
  {
    field: "hinhanh",
    headerName: "Hình ảnh",
    width: 80,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.value} alt="Product" />
        </div>
      );
    },
  },
  {
    field: "loaisp",
    headerName: "Loại sản phẩm",
    width: 120,
  },
  {
    field: "mausac",
    headerName: "Màu sắc",
    width: 100,
  },
  {
    field: "kichco",
    headerName: "Kích cỡ",
    width: 100,
  },
  {
    field: "soluong",
    headerName: "Số lượng",
    width: 100,
  },
];
