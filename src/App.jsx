
import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import TestResultForm from './components/TestResultForm';
import TestResultsReport from './components/TestResultsReport';
import SearchBar from './components/SearchBar';

function App() {
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [refreshTestResults, setRefreshTestResults] = useState(false);

  const triggerRefreshUsers = () => setRefreshUsers(!refreshUsers);
  const triggerRefreshTestResults = () => setRefreshTestResults(!refreshTestResults);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">ระบบบันทึกผลการทดสอบขอใบอนุญาตขับขี่</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserForm fetchUsers={triggerRefreshUsers} fetchTestResults={triggerRefreshTestResults} />
        <TestResultForm fetchTestResults={triggerRefreshTestResults} />
      </div>
      <UserList refresh={refreshUsers} />
      <TestResultsReport />
      <SearchBar />
    </div>
  );
}

export default App;
