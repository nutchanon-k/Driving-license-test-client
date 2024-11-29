// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm'; // นำเข้าคอมโพเนนต์ EditUserForm

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State สำหรับเก็บผู้ใช้ที่กำลังแก้ไข

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      // คุณสามารถเพิ่มการแสดงข้อผิดพลาดได้ที่นี่
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]); // รีเฟรชเมื่อ refresh เปลี่ยนแปลง

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจที่จะลบผู้ทดสอบรายนี้หรือไม่?')) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        // คุณสามารถเพิ่มการแสดงข้อผิดพลาดได้ที่นี่
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = () => {
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div className="card shadow-md bg-base-100 p-6 mb-6">
      <h2 className="card-title mb-4">รายชื่อผู้ทดสอบ</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>วันที่บันทึก</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn btn-warning btn-sm mr-2"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-error btn-sm"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* แสดง EditUserForm เมื่อมีผู้ใช้ที่กำลังแก้ไข */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default UserList;
