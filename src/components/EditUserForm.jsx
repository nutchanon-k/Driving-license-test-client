// src/components/EditUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, onCancel, onSave }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${user.id}`, { firstName, lastName });
      setSuccess('แก้ไขข้อมูลผู้ทดสอบเรียบร้อยแล้ว');
      setError('');
      onSave(); // เรียกใช้ callback เพื่อรีเฟรชข้อมูลใน UserList
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ทดสอบ');
      setSuccess('');
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">แก้ไขข้อมูลผู้ทดสอบ</h3>
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
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">ชื่อ:</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">นามสกุล:</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              ยกเลิก
            </button>
            <button type="submit" className="btn btn-primary">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
