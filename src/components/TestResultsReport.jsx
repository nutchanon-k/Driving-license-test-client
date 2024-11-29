// src/components/TestResultsReport.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestResultsReport = () => {
  const [testResults, setTestResults] = useState([]);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);
  const [pending, setPending] = useState(0);

  const fetchTestResults = async () => {
    const res = await axios.get('http://localhost:8000/api/testresults');
    setTestResults(res.data);

    const passedCount = res.data.filter(tr => tr.status === 'PASSED').length;
    const failedCount = res.data.filter(tr => tr.status === 'FAILED').length;
    const pendingCount = res.data.filter(tr => tr.status === 'PENDING').length;

    setPassed(passedCount);
    setFailed(failedCount);
    setPending(pendingCount);
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  return (
    <div className="card shadow-md bg-base-100 p-6 mb-6">
      <h2 className="card-title mb-4">รายงานผลการทดสอบ</h2>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">ผ่านการทดสอบ</div>
          <div className="stat-value text-success">{passed}</div>
        </div>
        <div className="stat">
          <div className="stat-title">ไม่ผ่านการทดสอบ</div>
          <div className="stat-value text-error">{failed}</div>
        </div>
        <div className="stat">
          <div className="stat-title">รอพิจารณา</div>
          <div className="stat-value text-warning">{pending}</div>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>ผู้ทดสอบ</th>
              <th>ผลการทดสอบร่างกาย</th>
              <th>ผลการทดสอบทฤษฎี</th>
              <th>ผลการทดสอบปฏิบัติ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map(tr => (
              <tr key={tr.id}>
                <td>{tr.user.firstName} {tr.user.lastName}</td>
                <td>
                  {tr?.physicalTest?.passed ? 
                    <span className="badge badge-success">ผ่าน</span> : 
                    <span className="badge badge-error">ไม่ผ่าน</span>}
                </td>
                <td>
                  {tr?.theoryTest?.passed ? 
                    <span className="badge badge-success">ผ่าน</span> : 
                    <span className="badge badge-error">ไม่ผ่าน</span>}
                </td>
                <td>
                  {tr?.practicalTest?.passed ? 
                    <span className="badge badge-success">ผ่าน</span> : 
                    <span className="badge badge-error">ไม่ผ่าน</span>}
                </td>
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
    </div>
  );
};

export default TestResultsReport;
