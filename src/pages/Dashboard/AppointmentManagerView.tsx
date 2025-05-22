import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getAppointment } from '../../store/actions/appointmentsAction';


interface Appointment {
  _id: string;
  tutorId: string;
  studentId: string;
  status: string;
  source: string;
  subject: string[];
  price: number;
  notes: string;
  area: string;
  grade: string;
  location: string;
  requirements: string;
  sessionsPerWeek: number;
  studyGoal: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AppointmentManagerView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [editData, setEditData] = useState({
    tutorId: '',
    studentId: '',
    subject: [] as string[],
    price: 0,
    grade: '',
    location: '',
    requirements: '',
    sessionsPerWeek: 1,
    status: 'pending',
    source: '',
    notes: '',
    area: '',
    studyGoal: '',
  });

  useEffect(() => {
    dispatch(getAppointment())
      .unwrap()
      .then((data: Appointment[]) => {
        setAppointmentData(data);
      })
      .catch((error: any) => {
        console.log('Lỗi:', error);
      });
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingId(null);
    setEditData({
      tutorId: '',
      studentId: '',
      subject: [],
      price: 0,
      grade: '',
      location: '',
      requirements: '',
      sessionsPerWeek: 1,
      status: 'pending',
      source: '',
      notes: '',
      area: '',
      studyGoal: '',
    });
    setIsModalOpen(true);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };


  // Hàm để hiển thị trạng thái dễ đọc
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  // Hàm hiển thị cấp học
  const getGradeDisplay = (grade: string) => {
    switch (grade) {
      case 'bachelor':
        return 'Đại học';
      case 'highschool':
        return 'Trung học phổ thông';
      case 'secondary':
        return 'Trung học cơ sở';
      case 'primary':
        return 'Tiểu học';
      default:
        return grade;
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

  // Hàm hiển thị môn học
  const getSubjectsDisplay = (subjects: string[]) => {
    const subjectMap: Record<string, string> = {
      'geography': 'Địa lý',
      'english': 'Tiếng Anh',
      'history': 'Lịch sử',
      'math': 'Toán',
      'physics': 'Vật lý',
      'chemistry': 'Hóa học',
      'biology': 'Sinh học',
      'literature': 'Văn học',
    };
    return subjects.map(subject => subjectMap[subject] || subject).join(', ');
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Quản lý Lịch Hẹn
        </h4>
      
      </div>

      {/* Appointment Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">ID</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Môn học</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Cấp học</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Giá tiền</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Số buổi/tuần</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Trạng thái</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-sm text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {appointmentData.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="p-3 xl:p-5 truncate text-sm">{appointment._id.slice(-6)}</td>
                <td className="p-3 xl:p-5 truncate">{getSubjectsDisplay(appointment.subject)}</td>
                <td className="p-3 xl:p-5">{getGradeDisplay(appointment.grade)}</td>
                <td className="p-3 xl:p-5">{appointment.price.toLocaleString('vi-VN')}đ</td>
                <td className="p-3 xl:p-5">{appointment.sessionsPerWeek} buổi</td>
                <td className="p-3 xl:p-5">
                  <span className={`px-2 py-1 rounded text-xs ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusDisplay(appointment.status)}
                  </span>
                </td>
                <td className="p-3 xl:p-5 flex">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-blue-600"
                    onClick={() => handleViewDetails(appointment)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>

      {/* Chi tiết Modal */}
      {isDetailModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50 p-4 mt-10 mr-30">
          <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg w-full max-w-5xl border dark:border-strokedark overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Thông tin chi tiết Lịch Hẹn: {selectedAppointment._id.slice(-6)}
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
                    <p className="text-black dark:text-white font-medium">{selectedAppointment._id}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Trạng thái</label>
                    <p className={`inline-block px-2 py-1 rounded text-white font-medium ${
                      selectedAppointment.status === 'completed' ? 'bg-green-500' :
                      selectedAppointment.status === 'confirmed' ? 'bg-blue-500' :
                      selectedAppointment.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {getStatusDisplay(selectedAppointment.status)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nguồn</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.source || 'Không có'}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin học tập */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin học tập</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Môn học</label>
                    <p className="text-black dark:text-white font-medium">{getSubjectsDisplay(selectedAppointment.subject)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Cấp học</label>
                    <p className="text-black dark:text-white font-medium">{getGradeDisplay(selectedAppointment.grade)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Số buổi/tuần</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.sessionsPerWeek} buổi</p>
                  </div>
                </div>
              </div>

              {/* Thông tin tài chính và địa điểm */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Tài chính & Địa điểm</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Giá tiền</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Khu vực</label>
                    <p className="text-black dark:text-white font-medium">{getAreaDisplay(selectedAppointment.area)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Địa điểm</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.location || 'Không có'}</p>
                  </div>
                </div>
              </div>

              {/* Yêu cầu và mục tiêu */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Yêu cầu & Mục tiêu</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Yêu cầu</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.requirements || 'Không có'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Mục tiêu học tập</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.studyGoal || 'Không có'}</p>
                  </div>
                </div>
              </div>

              {/* Ghi chú */}
              {selectedAppointment.notes && (
                <div className="mb-4">
                  <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Ghi chú</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <p className="text-black dark:text-white">{selectedAppointment.notes}</p>
                  </div>
                </div>
              )}

              {/* Thông tin hệ thống */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin hệ thống</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">ID Gia sư</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.tutorId}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">ID Học sinh</label>
                    <p className="text-black dark:text-white font-medium">{selectedAppointment.studentId}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</label>
                    <p className="text-black dark:text-white font-medium">
                      {new Date(selectedAppointment.createdAt).toLocaleString('vi-VN')}
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
    </div>
  );
};

export default AppointmentManagerView;