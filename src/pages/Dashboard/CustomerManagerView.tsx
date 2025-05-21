import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getCustomer } from '../../store/actions/customerActions';

interface Customer {
  _id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  active: boolean;
  typeCustomer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  area?: string;
  dob?: string | null;
  gender?: string;
}

const CustomerManagerView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [editData, setEditData] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    typeCustomer: 'highschool_student',
    active: true,
    area: '',
    gender: '',
    dob: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getCustomer())
      .unwrap()
      .then((data: Customer[]) => {
        setCustomerData(data);
      })
      .catch((error: any) => {
        console.log('Lỗi:', error);
      });
  }, [dispatch]);

  const handleEdit = (customer: Customer) => {
    setEditingId(customer._id);
    setEditData({
      username: customer.username,
      fullName: customer.fullName,
      phoneNumber: customer.phoneNumber,
      email: customer.email || '',
      typeCustomer: customer.typeCustomer,
      active: customer.active,
      area: customer.area || '',
      gender: customer.gender || '',
      dob: customer.dob || '',
      password: '', // Không lấy mật khẩu từ dữ liệu hiện có
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setEditData({
      username: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      typeCustomer: 'highschool_student',
      active: true,
      area: '',
      gender: '',
      dob: '',
      password: '',
    });
    setIsModalOpen(true);
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const handleToggleActive = (customer: Customer) => {
    // Đây là phần xử lý toggle trạng thái active
    // Ví dụ:
    // dispatch(updateCustomerStatus({ customerId: customer._id, active: !customer.active }))
    //   .unwrap()
    //   .then(() => {
    //     // Cập nhật trạng thái trong state local
    //     setCustomerData(prevData => 
    //       prevData.map(item => 
    //         item._id === customer._id ? { ...item, active: !item.active } : item
    //       )
    //     );
    //   });
    console.log("Toggle active status for customer:", customer._id);
  };

  // Hàm để hiển thị loại khách hàng dễ đọc
  const getCustomerTypeDisplay = (type: string) => {
    switch (type) {
      case 'highschool_student':
        return 'Học sinh THPT';
      case 'university_student':
        return 'Sinh viên đại học';
      case 'employee':
        return 'Người đi làm';
      default:
        return type;
    }
  };

  // Hàm hiển thị khu vực
  const getAreaDisplay = (area?: string) => {
    if (!area) return 'Không có';
    const areaMap: Record<string, string> = {
      'tinh_dien_bien': 'Tỉnh Điện Biên',
      'tinh_hoa_binh': 'Tỉnh Hòa Bình',
      'tinh_lai_chau': 'Tỉnh Lai Châu',
      'tinh_son_la': 'Tỉnh Sơn La',
      'tinh_ha_noi': 'Hà Nội',
    };
    return areaMap[area] || area;
  };

  // Hàm hiển thị giới tính
  const getGenderDisplay = (gender?: string) => {
    if (!gender) return 'Không có';
    const genderMap: Record<string, string> = {
      '0': 'Khác',
      '1': 'Nam',
      '2': 'Nữ',
    };
    return genderMap[gender] || gender;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Quản lý Khách Hàng
        </h4>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddNew}
        >
          Thêm Khách Hàng
        </button>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">ID</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Họ và tên</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">SĐT/Tài khoản</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Email</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Loại KH</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Trạng thái</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((customer) => (
              <tr
                key={customer._id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="p-3 xl:p-5 truncate text-sm">{customer._id.slice(-6)}</td>
                <td className="p-3 xl:p-5 truncate">{customer.fullName}</td>
                <td className="p-3 xl:p-5">{customer.phoneNumber}</td>
                <td className="p-3 xl:p-5 truncate">{customer.email}</td>
                <td className="p-3 xl:p-5">
                  {getCustomerTypeDisplay(customer.typeCustomer)}
                </td>
                <td className="p-3 xl:p-5">
                  <span className={`px-2 py-1 rounded text-xs ${customer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {customer.active ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="p-3 xl:p-5 flex">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-blue-600"
                    onClick={() => handleViewDetails(customer)}
                  >
                    Chi tiết
                  </button>
                  {/* <button
                    className={`${customer.active ? 'bg-orange-500' : 'bg-green-500'} text-white px-2 py-1 rounded mr-2 text-sm hover:bg-orange-600`}
                    onClick={() => handleToggleActive(customer)}
                  >
                    {customer.active ? 'Tạm dừng' : 'Kích hoạt'}
                  </button> */}
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>

      {/* Chi tiết Modal */}
      {isDetailModalOpen && selectedCustomer && (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50 p-4 mt-10 mr-30">
    <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg w-full max-w-5xl border dark:border-strokedark overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Thông tin chi tiết Khách Hàng: {selectedCustomer.fullName}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsDetailModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Thông tin cá nhân */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin cá nhân</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">ID</label>
                    <p className="text-black dark:text-white font-medium">{selectedCustomer._id}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Tên đăng nhập</label>
                    <p className="text-black dark:text-white font-medium">{selectedCustomer.username}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Trạng thái</label>
                    <p className={`inline-block px-2 py-1 rounded text-white font-medium ${selectedCustomer.active ? 'bg-green-500' : 'bg-red-500'}`}>
                      {selectedCustomer.active ? 'Hoạt động' : 'Không hoạt động'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin liên hệ</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Họ và tên</label>
                    <p className="text-black dark:text-white font-medium">{selectedCustomer.fullName}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Số điện thoại</label>
                    <p className="text-black dark:text-white font-medium">{selectedCustomer.phoneNumber}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <p className="text-black dark:text-white font-medium">{selectedCustomer.email || 'Không có'}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin khách hàng */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin khách hàng</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Loại khách hàng</label>
                    <p className="text-black dark:text-white font-medium">{getCustomerTypeDisplay(selectedCustomer.typeCustomer)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Khu vực</label>
                    <p className="text-black dark:text-white font-medium">{getAreaDisplay(selectedCustomer.area)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Giới tính</label>
                    <p className="text-black dark:text-white font-medium">{getGenderDisplay(selectedCustomer.gender)}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin ngày sinh */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin thêm</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày sinh</label>
                    <p className="text-black dark:text-white font-medium">
                      {selectedCustomer.dob 
                        ? new Date(selectedCustomer.dob).toLocaleDateString('vi-VN') 
                        : 'Không có'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</label>
                    <p className="text-black dark:text-white font-medium">
                      {new Date(selectedCustomer.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày cập nhật</label>
                    <p className="text-black dark:text-white font-medium">
                      {new Date(selectedCustomer.updatedAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ảnh đại diện (nếu có) */}
              {selectedCustomer.avatar && (
                <div className="mb-4">
                  <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Ảnh đại diện</h4>
                  <div className="flex justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="w-32 h-32 overflow-hidden rounded-full">
                      <img 
                        src={selectedCustomer.avatar} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4 pt-3 border-t">
              {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                onClick={() => {
                  setIsDetailModalOpen(false);
                  handleEdit(selectedCustomer);
                }}
              >
                Sửa thông tin
              </button> */}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default CustomerManagerView;