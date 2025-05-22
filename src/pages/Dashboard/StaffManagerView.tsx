import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createStaff, getStaff } from '../../store/actions/staffAction';

interface Staff {
  _id: string;
  username: string;
  role: string;
  name: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const StaffManagerView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const [editData, setEditData] = useState({
    username: '',
    role: 'staff',
    name: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    dispatch(getStaff())
      .unwrap()
      .then((data: Staff[]) => {
        setStaffData(data);
      })
      .catch((error: any) => {
        console.log('Lỗi:', error);
      });
  }, [dispatch]);

  const handleEdit = (staff: Staff) => {
    setEditingId(staff._id);
    setEditData({
      username: staff.username,
      role: staff.role,
      name: staff.name,
      phone: staff.phone,
      password: '', // Không lấy mật khẩu từ dữ liệu hiện có
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setEditData({
      username: '',
      role: 'staff',
      name: '',
      phone: '',
      password: '',
    });
    setIsModalOpen(true);
  };

  const handleViewDetails = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsDetailModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      // dispatch(updateStaff({ staffId: editingId, payload: editData }))
      //   .unwrap()
      //   .then(() => {
      //     // Refresh data after update
      //     dispatch(getStaff()).unwrap().then(setStaffData);
      //   });
    } else {
      dispatch(createStaff(editData))
        .unwrap()
        .then(() => {
          // Refresh data after create
          dispatch(getStaff()).unwrap().then(setStaffData);
        });
    }
    setIsModalOpen(false);
  };

  // Hàm để hiển thị vai trò dễ đọc
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản lý';
      case 'staff':
        return 'Nhân viên';
      case 'manager':
        return 'Trưởng phòng';
      default:
        return role;
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Quản lý Nhân Viên
        </h4>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddNew}
        >
          Thêm Nhân Viên
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">ID</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Họ và tên</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Tài khoản</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Vai trò</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Số điện thoại</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr
                key={staff._id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="p-3 xl:p-5 truncate text-sm">{staff._id.slice(-6)}</td>
                <td className="p-3 xl:p-5 truncate">{staff.name}</td>
                <td className="p-3 xl:p-5">{staff.username}</td>
                <td className="p-3 xl:p-5">
                  <span className={`px-2 py-1 rounded text-xs ${
                    staff.role === 'admin' ? 'bg-red-100 text-red-800' :
                    staff.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {getRoleDisplay(staff.role)}
                  </span>
                </td>
                <td className="p-3 xl:p-5">{staff.phone}</td>
                <td className="p-3 xl:p-5 flex">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-blue-600"
                    onClick={() => handleViewDetails(staff)}
                  >
                    Chi tiết
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                    onClick={() => handleEdit(staff)}
                  >
                    Sửa
                  </button>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>

      {/* Chi tiết Modal */}
      {isDetailModalOpen && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50 p-4 mt-10 mr-30">
          <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg w-full max-w-5xl border dark:border-strokedark overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Thông tin chi tiết Nhân Viên: {selectedStaff.name}
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
              {/* Thông tin cơ bản */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin cơ bản</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">ID</label>
                    <p className="text-black dark:text-white font-medium">{selectedStaff._id}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Tên đăng nhập</label>
                    <p className="text-black dark:text-white font-medium">{selectedStaff.username}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Vai trò</label>
                    <p className={`inline-block px-2 py-1 rounded text-white font-medium ${
                      selectedStaff.role === 'admin' ? 'bg-red-500' :
                      selectedStaff.role === 'manager' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}>
                      {getRoleDisplay(selectedStaff.role)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thông tin liên hệ */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin liên hệ</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Họ và tên</label>
                    <p className="text-black dark:text-white font-medium">{selectedStaff.name}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Số điện thoại</label>
                    <p className="text-black dark:text-white font-medium">{selectedStaff.phone}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin hệ thống */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin hệ thống</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</label>
                    <p className="text-black dark:text-white font-medium">
                      {new Date(selectedStaff.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày cập nhật</label>
                    <p className="text-black dark:text-white font-medium">
                      {new Date(selectedStaff.updatedAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-3 border-t">
           
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

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg w-96 border dark:border-strokedark"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">
              {editingId ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên'}
            </h3>

            {/* Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-black dark:text-white">
                Họ và tên
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded dark:bg-meta-4 dark:text-white"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Username */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-black dark:text-white">
                Tên tài khoản
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded dark:bg-meta-4 dark:text-white"
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
                required
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-black dark:text-white">
                Vai trò
              </label>
              <select
                className="w-full border p-2 rounded dark:bg-meta-4 dark:text-white"
                value={editData.role}
                onChange={(e) =>
                  setEditData({ ...editData, role: e.target.value })
                }
              >
                <option value="staff">Nhân viên</option>
                <option value="manager">Trưởng phòng</option>
                <option value="admin">Quản lý</option>
              </select>
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-black dark:text-white">
                Số điện thoại
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded dark:bg-meta-4 dark:text-white"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-black dark:text-white">
                Mật khẩu {editingId && '(để trống nếu không thay đổi)'}
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded dark:bg-meta-4 dark:text-white"
                value={editData.password}
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
                required={!editingId}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default StaffManagerView;