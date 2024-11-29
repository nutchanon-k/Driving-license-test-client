// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:8000/api/testresults/search?query=${query}`);
    setResults(res.data);
  };

  return (
    <div className="card shadow-md bg-base-100 p-6 mb-6">
      <h2 className="card-title mb-4">ค้นหาผลการทดสอบ</h2>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ชื่อหรือนามสกุล"
          required
          className="input input-bordered w-full md:w-1/2"
        />
        <button type="submit" className="btn btn-primary w-full md:w-auto">ค้นหา</button>
      </form>
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>ผู้ทดสอบ</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {results.map(tr => (
                <tr key={tr.id}>
                  <td>{tr.user.firstName} {tr.user.lastName}</td>
                  <td>
                    {tr.status === 'PASSED' ? 
                      <span className="badge badge-success">ผ่านการทดสอบ</span> :
                      tr.status === 'FAILED' ? 
                        <span className="badge badge-error">ไม่ผ่านการทดสอบ</span> :
                        <span className="badge badge-warning">รอพิจารณา</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
