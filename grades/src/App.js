import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({
    studentId: '',
    professorId: '',
    subjectId: '',
    gradeValue: '',
    description: ''
  });
  const [editedGrade, setEditedGrade] = useState({
    id: '',
    studentId: '',
    professorId: '',
    subjectId: '',
    gradeValue: '',
    description: ''
  });

  const fetchGrades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/web/grades');
      setGrades(response.data);
    } catch (error) {
      console.error('Error calling Grades service:', error);
    }
  };

  const addGrade = async () => {
    try {
      const response = await axios.post('http://localhost:3000/web/grades', newGrade);
      const addedGrade = response.data; // Ensure this includes the unique ID from the backend
      setGrades([...grades, addedGrade]);
      setNewGrade({
        studentId: '',
        professorId: '',
        subjectId: '',
        gradeValue: '',
        description: ''
      });
      fetchGrades();
    } catch (error) {
      console.error('Error calling Grades service:', error);
    }
  };

  const updateGrade = async () => {
    try {
      await axios.put(`http://localhost:3000/web/grades/${editedGrade.id}`, editedGrade);
      const updatedGrades = grades.map((grade) => {
        if (grade.id === editedGrade.id || grade._id === editedGrade.id) {
          return { ...grade, ...editedGrade };
        }
        return grade;
      });
      setGrades(updatedGrades);
      setEditedGrade({
        id: '',
        studentId: '',
        professorId: '',
        subjectId: '',
        gradeValue: '',
        description: ''
      });
    } catch (error) {
      console.error('Error calling Grades service:', error);
    }
  };

  const deleteGrade = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/web/grades/${id}`);
      const updatedGrades = grades.filter((grade) => grade.id !== id && grade._id !== id);
      setGrades(updatedGrades);
    } catch (error) {
      console.error('Error calling Grades service:', error);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <div>
      <h1>Microservice Frontend: Grades</h1>

      <section className="add-grade">
        <h2>Add Grade</h2>
        <div className="input-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            placeholder="Enter student ID"
            value={newGrade.studentId}
            onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="professorId">Professor ID:</label>
          <input
            type="text"
            id="professorId"
            placeholder="Enter professor ID"
            value={newGrade.professorId}
            onChange={(e) => setNewGrade({ ...newGrade, professorId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="subjectId">Subject ID:</label>
          <input
            type="text"
            id="subjectId"
            placeholder="Enter subject ID"
            value={newGrade.subjectId}
            onChange={(e) => setNewGrade({ ...newGrade, subjectId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="gradeValue">Grade:</label>
          <input
            type="number"
            id="gradeValue"
            placeholder="Enter grade value"
            value={newGrade.gradeValue}
            onChange={(e) => setNewGrade({ ...newGrade, gradeValue: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            value={newGrade.description}
            onChange={(e) => setNewGrade({ ...newGrade, description: e.target.value })}
          />
        </div>
        <button className="add-button" onClick={addGrade}>Add Grade</button>
      </section>

      <section className="edit-grade">
        <h2>Edit Grade</h2>
        <div className="input-group">
          <label htmlFor="editGradeId">Grade ID:</label>
          <input
            type="text"
            id="editGradeId"
            placeholder="Enter grade ID"
            value={editedGrade.id}
            onChange={(e) => setEditedGrade({ ...editedGrade, id: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editStudentId">Student ID:</label>
          <input
            type="text"
            id="editStudentId"
            placeholder="Enter student ID"
            value={editedGrade.studentId}
            onChange={(e) => setEditedGrade({ ...editedGrade, studentId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editSubjectId">Subject ID:</label>
          <input
            type="text"
            id="editSubjectId"
            placeholder="Enter subject ID"
            value={editedGrade.subjectId}
            onChange={(e) => setEditedGrade({ ...editedGrade, subjectId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editProfessorId">Professor ID:</label>
          <input
            type="text"
            id="editProfessorId"
            placeholder="Enter professor ID"
            value={editedGrade.professorId}
            onChange={(e) => setEditedGrade({ ...editedGrade, professorId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editGradeValue">Grade:</label>
          <input
            type="number"
            id="editGradeValue"
            placeholder="Enter grade value"
            value={editedGrade.gradeValue}
            onChange={(e) => setEditedGrade({ ...editedGrade, gradeValue: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editDescription">Description:</label>
          <input
            type="text"
            id="editDescription"
            placeholder="Enter description"
            value={editedGrade.description}
            onChange={(e) => setEditedGrade({ ...editedGrade, description: e.target.value })}
          />
        </div>
        <button className="update-button" onClick={updateGrade}>Update Grade</button>
      </section>

      <section className="grade-list">
        <h2>Grades:</h2>
        <ul className="grade-list">
          {grades.map((grade) => (
            <li key={grade.id || grade._id} className="grade-item">
              <span>{grade.gradeValue}</span>
              <button className="delete-button" onClick={() => deleteGrade(grade.id || grade._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
