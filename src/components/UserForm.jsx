import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ fetchUsers, fetchTestResults }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userRes = await axios.post('http://localhost:8000/api/users', { firstName, lastName });
            setFirstName('');
            setLastName('');
            setError('');
            setSuccess('เพิ่มผู้ทดสอบใหม่เรียบร้อยแล้ว');
            // รีเฟรชรายชื่อผู้ทดสอบ
            fetchUsers();
            // รีเฟรชรายชื่อผู้ทดสอบใน TestResultForm
            fetchTestResults();
        } catch (err) {
            console.error(err);
            setError('เกิดข้อผิดพลาดในการเพิ่มผู้ทดสอบ');
            setSuccess('');
        }

    };

    return (
        <div className="card shadow-md bg-base-100 p-6 mb-6">
            <h2 className="card-title mb-4">เพิ่มผู้ทดสอบใหม่</h2>
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
                <button type="submit" className="btn btn-primary w-full">เพิ่ม</button>
            </form>
        </div>
    );
};

export default UserForm;
