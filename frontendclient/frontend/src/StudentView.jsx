import React, { useState } from 'react';
import { useStudents } from './hooks';
import './App.css';


const StudentView = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const { students, refetch } = useStudents();

  // Trigger search on button click
  const handleSearch = () => {
    refetch(search, filter);
  };

  return (
    <section className="view-section">
      <h2>Search Student Grade</h2>

      {/* Search and Filter */}
      <div className="controls">
        <label style={{ marginTop: "5px" }}>Student Name:</label>
        <div className="search-box">
          <input
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <label style={{ marginTop: "5px" }}>Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="All" className="opt-all">All Students</option>
          <option value="PASS" className="opt-pass">Pass Students Only</option>
          <option value="FAIL" className="opt-fail">Fail Students Only</option>
        </select>

        <button onClick={handleSearch} className="search-btn">Get Data</button>
      </div>
      <div className="table-wrapper">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Grade(%)</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.studentName}</td>
                <td>{student.subjectName}</td>
                <td>{student.grade}</td>
                <td className={`remarks-${student.remarks.toLowerCase()}`}>
                  {student.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section >
  );
};

export default StudentView;
