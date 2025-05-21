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

  const [editData, setEditData] = useState({
    username: '',
    role: '',
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
      password: staff.password || '',
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setEditData({ username: '', role: 'staff', name: '', phone: '', password: '' });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      // dispatch(updateStaff({ staffId: editingId, payload: editData }))
      //   .unwrap()
      //   .then(() => {});
    } else {
      dispatch(createStaff(editData))
        .unwrap()
        .then(() => {});
    }
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Quản lý Nhân Viên
        </h4>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddNew}
        >
          + Thêm Nhân Viên
        </button>
      </div>

      {/* Staff Table */}
      <div className="flex flex-col">
        <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1fr_1fr_120px] bg-gray-2 dark:bg-meta-4">
          <div className="p-3 xl:p-5 font-medium uppercase">ID</div>
          <div className="p-3 xl:p-5 font-medium uppercase">Họ và tên</div>
          <div className="p-3 xl:p-5 font-medium uppercase">Tài khoản</div>
          <div className="p-3 xl:p-5 font-medium uppercase">Vai trò</div>
          <div className="p-3 xl:p-5 font-medium uppercase">Số điện thoại</div>
          <div className="p-3 xl:p-5 font-medium uppercase"></div>
        </div>

        {staffData.map((staff) => (
          <div
            key={staff._id}
            className="grid grid-cols-[100px_1.5fr_1fr_1fr_1fr_1fr_120px] border-b border-stroke dark:border-strokedark"
          >
            <div className="p-3 xl:p-5 truncate">{staff._id}</div>
            <div className="p-5 xl:p-5 truncate">{staff.name}</div>
            <div className="p-3 xl:p-5">{staff.username}</div>
            <div className="p-3 xl:p-5">
              {staff.role === 'admin' ? 'Quản lí' : 'Nhân viên'}
            </div>
             <div className="p-3 xl:p-5">
              {staff.role === 'admin' ? 'Quản lí' : 'Nhân viên'}
            </div>
            <div className="p-3 xl:p-5">{staff.phone}</div>
            <div className="p-3 xl:p-5">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleEdit(staff)}
              >
                Sửa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
                {/* Bạn có thể thêm role khác nếu cần */}
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
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full border p-2 rounded dark:bg-meta-4 dark:text-white"
                value={editData.password}
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="bg-gray-500 text-white px-3 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-3 py-2 rounded"
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
