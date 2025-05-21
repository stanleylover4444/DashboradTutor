import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getTutor } from '../../store/actions/tutorAction';

interface Tutor {
  _id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  educationLevel: string;
  subjects: string[];
  area: string;
  gender: string;
  dob: string;
  active: boolean;
  priceData: {
    onlineAdvise: {
      fromValue: number;
      toValue: number;
    };
    officeAdvise: {
      fromValue: number;
      toValue: number;
    };
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Helper function to format price range
const formatPrice = (from: number, to: number): string => {
  return `${from.toLocaleString()} - ${to.toLocaleString()} VND`;
};

// Helper function to translate subjects to Vietnamese
const translateSubject = (subject: string): string => {
  const subjectMap: Record<string, string> = {
    math: 'Toán học',
    physics: 'Vật lý',
    chemistry: 'Hóa học',
    biology: 'Sinh học',
    literature: 'Văn học',
    english: 'Tiếng Anh',
    history: 'Lịch sử',
    geography: 'Địa lý'
  };
  
  return subjectMap[subject] || subject;
};

// Helper function to translate education level
const translateEducation = (level: string): string => {
  const educationMap: Record<string, string> = {
    highSchool: 'THPT',
    bachelor: 'Cử nhân',
    master: 'Thạc sĩ',
    phd: 'Tiến sĩ'
  };
  
  return educationMap[level] || level;
};

// Helper function to translate area
const translateArea = (area: string): string => {
  const areaMap: Record<string, string> = {
    thanh_pho_ho_chi_minh: 'TP. Hồ Chí Minh',
    ha_noi: 'Hà Nội',
    da_nang: 'Đà Nẵng'
  };
  
  return areaMap[area] || area;
};

// Helper function for gender
const getGender = (gender: string): string => {
  return gender === '1' ? 'Nam' : 'Nữ';
};

const TutorManagerView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tutorData, setTutorData] = useState<Tutor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editData, setEditData] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    educationLevel: 'bachelor',
    subjects: [] as string[],
    area: 'thanh_pho_ho_chi_minh',
    gender: '1',
    dob: '',
    priceData: {
      onlineAdvise: {
        fromValue: 0,
        toValue: 0
      },
      officeAdvise: {
        fromValue: 0,
        toValue: 0
      }
    }
  });

  useEffect(() => {
    dispatch(getTutor())
      .unwrap()
      .then((data: Tutor[]) => {
   
        setTutorData(data);
      })
      .catch((error: any) => {
        console.log('Lỗi:', error);
      });
  }, [dispatch]);

  const handleEdit = (tutor: Tutor) => {
    setEditingId(tutor._id);
    setEditData({
      username: tutor.username,
      fullName: tutor.fullName,
      phoneNumber: tutor.phoneNumber,
      email: tutor.email || '',
      educationLevel: tutor.educationLevel,
      subjects: tutor.subjects,
      area: tutor.area,
      gender: tutor.gender,
      dob: tutor.dob,
      priceData: {
        onlineAdvise: {
          fromValue: tutor.priceData?.onlineAdvise?.fromValue || 0,
          toValue: tutor.priceData?.onlineAdvise?.toValue || 0
        },
        officeAdvise: {
          fromValue: tutor.priceData?.officeAdvise?.fromValue || 0,
          toValue: tutor.priceData?.officeAdvise?.toValue || 0
        }
      }
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
      educationLevel: 'bachelor',
      subjects: [],
      area: 'thanh_pho_ho_chi_minh',
      gender: '1',
      dob: '',
      priceData: {
        onlineAdvise: {
          fromValue: 0,
          toValue: 0
        },
        officeAdvise: {
          fromValue: 0,
          toValue: 0
        }
      }
    });
    setIsModalOpen(true);
  };

  // const handleSave = () => {
  //   if (editingId) {
  //     // dispatch(updateTutor({ tutorId: editingId, payload: editData }))
  //     //   .unwrap()
  //     //   .then(() => {});
  //   } else {
  //     dispatch(createTutor(editData))
  //       .unwrap()
  //       .then(() => {});
  //   }
  //   setIsModalOpen(false);
  // };

  const handleSubjectChange = (subject: string) => {
    const updatedSubjects = [...editData.subjects];
    if (updatedSubjects.includes(subject)) {
      const index = updatedSubjects.indexOf(subject);
      updatedSubjects.splice(index, 1);
    } else {
      updatedSubjects.push(subject);
    }
    setEditData({ ...editData, subjects: updatedSubjects });
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const handleToggleActive = (tutor: Tutor) => {
    // Here you would dispatch an action to update the tutor's active status
    // For example:
    // dispatch(updateTutorActive({ tutorId: tutor._id, active: !tutor.active }))
    //   .unwrap()
    //   .then(() => {
    //     // Update the local state to reflect the change
    //     setTutorData(prevData => 
    //       prevData.map(item => 
    //         item._id === tutor._id ? { ...item, active: !item.active } : item
    //       )
    //     );
    //   });
    console.log("Toggle active status for tutor:", tutor._id);
  };

  const handleViewDetails = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Quản lý Gia Sư
        </h4>
    
      </div>

      {/* Tutor Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="p-3 xl:p-5 font-medium uppercase text-left">ID</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Họ và tên</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Số điện thoại</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Giới tính</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Trình độ</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Khu vực</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Trạng thái</th>
              <th className="p-3 xl:p-5 font-medium uppercase text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {tutorData.map((tutor) => (
              <tr
                key={tutor._id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="p-3 xl:p-5 truncate">{tutor._id.substring(0, 8)}...</td>
                <td className="p-3 xl:p-5">{tutor.fullName}</td>
                <td className="p-3 xl:p-5">{tutor.phoneNumber}</td>
                <td className="p-3 xl:p-5">{getGender(tutor.gender)}</td>
                <td className="p-3 xl:p-5">{translateEducation(tutor.educationLevel)}</td>
                <td className="p-3 xl:p-5">{translateArea(tutor.area)}</td>
                <td className="p-3 xl:p-5">
                  <span className={`px-2 py-1 rounded text-white ${tutor.active ? 'bg-green-500' : 'bg-red-500'}`}>
                    {tutor.active ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="p-3 xl:p-5 flex">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleViewDetails(tutor)}
                  >
                    Chi tiết
                  </button>
                  {/* <button
                    className={`${tutor.active ? 'bg-orange-500' : 'bg-green-500'} text-white px-2 py-1 rounded mr-2`}
                    onClick={() => handleToggleActive(tutor)}
                  >
                    {tutor.active ? 'Tạm dừng' : 'Kích hoạt'}
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {isDetailModalOpen && selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50 p-4 mt-10 mr-30">
    <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg w-full max-w-5xl border dark:border-strokedark overflow-y-auto max-h-[80vh]">
      {/* Nội dung giữ nguyên */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Thông tin chi tiết Gia Sư: {selectedTutor.fullName}
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
                    <p className="text-black dark:text-white font-medium">{selectedTutor._id}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Tên đăng nhập</label>
                    <p className="text-black dark:text-white font-medium">{selectedTutor.username}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Trạng thái</label>
                    <p className={`inline-block px-2 py-1 rounded text-white font-medium ${selectedTutor.active ? 'bg-green-500' : 'bg-red-500'}`}>
                      {selectedTutor.active ? 'Hoạt động' : 'Không hoạt động'}
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
                    <p className="text-black dark:text-white font-medium">{selectedTutor.fullName}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Số điện thoại</label>
                    <p className="text-black dark:text-white font-medium">{selectedTutor.phoneNumber}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <p className="text-black dark:text-white font-medium">{selectedTutor.email || 'Không có'}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin cá nhân khác */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin cá nhân khác</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Giới tính</label>
                    <p className="text-black dark:text-white font-medium">{getGender(selectedTutor.gender)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày sinh</label>
                    <p className="text-black dark:text-white font-medium">
                      {selectedTutor.dob 
                        ? new Date(selectedTutor.dob).toLocaleDateString('vi-VN') 
                        : 'Không có'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Khu vực</label>
                    <p className="text-black dark:text-white font-medium">{translateArea(selectedTutor.area)}</p>
                  </div>
                </div>
              </div>

              {/* Thông tin học vấn và giảng dạy */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin học vấn và giảng dạy</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Trình độ học vấn</label>
                    <p className="text-black dark:text-white font-medium">{translateEducation(selectedTutor.educationLevel)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Môn học giảng dạy</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTutor.subjects.map(subject => (
                        <span key={subject} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {translateSubject(subject)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin phí tư vấn */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-black dark:text-white mb-2 border-b pb-1">Thông tin phí tư vấn</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phí tư vấn online</label>
                    <p className="text-black dark:text-white font-medium">
                      {formatPrice(
                        selectedTutor.priceData?.onlineAdvise?.fromValue || 0,
                        selectedTutor.priceData?.onlineAdvise?.toValue || 0
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phí tư vấn tại văn phòng</label>
                    <p className="text-black dark:text-white font-medium">
                      {formatPrice(
                        selectedTutor.priceData?.officeAdvise?.fromValue || 0,
                        selectedTutor.priceData?.officeAdvise?.toValue || 0
                      )}
                    </p>
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
                      {new Date(selectedTutor.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Ngày cập nhật</label>
                    <p className="text-black dark:text-white font-medium">
                      {new Date(selectedTutor.updatedAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-3 border-t">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
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

export default TutorManagerView;