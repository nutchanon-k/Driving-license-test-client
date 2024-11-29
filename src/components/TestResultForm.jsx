
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestResultForm = ({ fetchTestResults }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [testResult, setTestResult] = useState(null); 
    const [physical, setPhysical] = useState({
        colorBlindTest: false,
        visionLongTest: false,
        visionTiltTest: false,
        reflexResponseTest: false,
        trafficSign: 0,
        trafficLine: 0,
        rightOfWay: 0,
    });
    const [practicalPassed, setPracticalPassed] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
     // ฟังก์ชันดึงข้อมูลผู้ใช้
  const fetchUsersData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ทดสอบ');
    }
  };

  // ฟังก์ชันดึงข้อมูล TestResult ของผู้ใช้ที่เลือก
  const fetchTestResult = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/testresults?userId=${userId}`);
      if (res.data.length > 0) {
        setTestResult(res.data[0]); // สมมติว่ามี TestResult เดียวต่อผู้ใช้
        setPhysical({
          colorBlindTest: res.data[0].physicalTest.colorBlindTest,
          visionLongTest: res.data[0].physicalTest.visionLongTest,
          visionTiltTest: res.data[0].physicalTest.visionTiltTest,
          reflexResponseTest: res.data[0].physicalTest.reflexResponseTest,
          trafficSign: res.data[0].theoryTest.trafficSign,
          trafficLine: res.data[0].theoryTest.trafficLine,
          rightOfWay: res.data[0].theoryTest.rightOfWay,
        });
        setPracticalPassed(res.data[0].practicalTest.passed);
      } else {
        setTestResult(null);
        setPhysical({
          colorBlindTest: false,
          visionLongTest: false,
          visionTiltTest: false,
          reflexResponseTest: false,
          trafficSign: 0,
          trafficLine: 0,
          rightOfWay: 0,
        });
        setPracticalPassed(false);
      }
      setError('');
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการดึงข้อมูลผลการทดสอบ');
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [fetchTestResults]); 
  
  useEffect(() => {
    if (selectedUser) {
      fetchTestResult(selectedUser);
    } else {
      setTestResult(null);
      setPhysical({
        colorBlindTest: false,
        visionLongTest: false,
        visionTiltTest: false,
        reflexResponseTest: false,
        trafficSign: 0,
        trafficLine: 0,
        rightOfWay: 0,
      });
      setPracticalPassed(false);
    }
  }, [selectedUser]);
//   console.log(selectedUser)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (testResult) {
        // อัปเดต TestResult ที่มีอยู่แล้ว
        await axios.put(`http://localhost:8000/api/testresults/${selectedUser}`, {
          userId: selectedUser,
          physicalTest: {
            colorBlindTest: physical?.colorBlindTest,
            visionLongTest: physical?.visionLongTest,
            visionTiltTest: physical?.visionTiltTest,
            reflexResponseTest: physical?.reflexResponseTest,
          },
          theoryTest: {
            trafficSign: physical?.trafficSign,
            trafficLine: physical?.trafficLine,
            rightOfWay: physical?.rightOfWay,
          },
          practicalTest: {
            passed: practicalPassed,
          },
        });
        setSuccess('อัปเดตผลการทดสอบเรียบร้อยแล้ว');
        setPhysical({
            colorBlindTest: false,
            visionLongTest: false,
            visionTiltTest: false,
            reflexResponseTest: false,
            trafficSign: 0,
            trafficLine: 0,
            rightOfWay: 0,
          });
      } else {
        // สร้าง TestResult ใหม่ (กรณีไม่มี)
        await axios.post('http://localhost:8000/api/testresults', {
          userId: selectedUser,
          physicalTest: {
            colorBlindTest: physical?.colorBlindTest,
            visionLongTest: physical?.visionLongTest,
            visionTiltTest: physical?.visionTiltTest,
            reflexResponseTest: physical?.reflexResponseTest,
          },
          theoryTest: {
            trafficSign: physical?.trafficSign,
            trafficLine: physical?.trafficLine,
            rightOfWay: physical?.rightOfWay,
          },
          practicalTest: {
            passed: practicalPassed,
          },
        });
        setSuccess('เพิ่มผลการทดสอบเรียบร้อยแล้ว');
      }

      
      setSelectedUser('');
      setTestResult(null);
      setPhysical({
        colorBlindTest: false,
        visionLongTest: false,
        visionTiltTest: false,
        reflexResponseTest: false,
        trafficSign: 0,
        trafficLine: 0,
        rightOfWay: 0,
      });
      setPracticalPassed(false);
      setError('');
      
      fetchTestResults();
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการบันทึกผลการทดสอบ');
      setSuccess('');
    }
  };

  return (
    <div className="card shadow-md bg-base-100 p-6 mb-6">
      <h2 className="card-title mb-4">เพิ่ม/แก้ไขผลการทดสอบ</h2>
      {error && (
        <div className="alert alert-error shadow-lg mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-10V6a2 2 0 00-2-2h-4m-6 0H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-4" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      {success && (
        <div className="alert alert-success shadow-lg mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{success}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* เลือกผู้ทดสอบ */}
        <div>
          <label className="label">
            <span className="label-text">เลือกผู้ทดสอบ:</span>
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="select select-bordered w-full"
          >
            <option value="">--เลือก--</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            ))}
          </select>
        </div>

        {/* ทดสอบร่างกาย */}
        <h3 className="text-lg font-semibold">ทดสอบร่างกาย</h3>
        <div className="flex flex-col space-y-2">
          <label className="cursor-pointer label">
            <span className="label-text">ทดสอบตาบอดสี:</span>
            <input
              type="checkbox"
              checked={physical.colorBlindTest}
              onChange={(e) => setPhysical({ ...physical, colorBlindTest: e.target.checked })}
              className="toggle toggle-primary"
            />
          </label>
          <label className="cursor-pointer label">
            <span className="label-text">ทดสอบสายตายาว:</span>
            <input
              type="checkbox"
              checked={physical.visionLongTest}
              onChange={(e) => setPhysical({ ...physical, visionLongTest: e.target.checked })}
              className="toggle toggle-primary"
            />
          </label>
          <label className="cursor-pointer label">
            <span className="label-text">ทดสอบสายตาเอียง:</span>
            <input
              type="checkbox"
              checked={physical.visionTiltTest}
              onChange={(e) => setPhysical({ ...physical, visionTiltTest: e.target.checked })}
              className="toggle toggle-primary"
            />
          </label>
          <label className="cursor-pointer label">
            <span className="label-text">ทดสอบการตอบสนองของร่างกาย:</span>
            <input
              type="checkbox"
              checked={physical.reflexResponseTest}
              onChange={(e) => setPhysical({ ...physical, reflexResponseTest: e.target.checked })}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        {/* ทดสอบภาคทฤษฎี */}
        <h3 className="text-lg font-semibold">ทดสอบภาคทฤษฎี</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">ป้ายจราจร (คะแนน):</span>
            </label>
            <input
              type="number"
              value={physical.trafficSign}
              onChange={(e) => setPhysical({ ...physical, trafficSign: parseInt(e.target.value) })}
              min="0"
              max="50"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">เส้นจราจร (คะแนน):</span>
            </label>
            <input
              type="number"
              value={physical.trafficLine}
              onChange={(e) => setPhysical({ ...physical, trafficLine: parseInt(e.target.value) })}
              min="0"
              max="50"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">การให้ทาง (คะแนน):</span>
            </label>
            <input
              type="number"
              value={physical.rightOfWay}
              onChange={(e) => setPhysical({ ...physical, rightOfWay: parseInt(e.target.value) })}
              min="0"
              max="50"
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* ทดสอบภาคปฏิบัติ */}
        <h3 className="text-lg font-semibold">ทดสอบภาคปฏิบัติ</h3>
        <div className="flex flex-col space-y-2">
          <label className="cursor-pointer label">
            <span className="label-text">ผ่านการทดสอบภาคปฏิบัติ:</span>
            <input
              type="checkbox"
              checked={practicalPassed}
              onChange={(e) => setPracticalPassed(e.target.checked)}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        {/* ปุ่มบันทึก */}
        <button type="submit" className="btn btn-primary w-full">บันทึกผลการทดสอบ</button>
      </form>
    </div>
  );
};

export default TestResultForm;