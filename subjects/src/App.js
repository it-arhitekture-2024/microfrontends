import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: '',
    description: '',
    professorId: '',
    assistantId: ''
  });
  const [editedSubject, setEditedSubject] = useState({
    id: '',
    name: '',
    description: '',
    professorId: '',
    assistantId: ''
  });

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/web/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error calling Subjects service:', error);
    }
  }

  const addSubject = async () => {
    try {
      const response = await axios.post('http://localhost:3000/web/subjects', newSubject);
      setSubjects([...subjects, response.data]);
      setNewSubject({
        name: '',
        description: '',
        professorId: '',
        assistantId: ''
      });
    } catch (error) {
      console.error('Error calling Subjects service:', error);
    }
  };

  const updateSubject = async () => {
    try {
      await axios.put(`http://localhost:3000/web/subjects/${editedSubject.id}`, editedSubject);
      const updatedSubjects = subjects.map(subject => {
        if (subject.id === editedSubject.id) {
          return { ...subject, ...editedSubject };
        }
        return subject;
      });
      setSubjects(updatedSubjects);
      setEditedSubject({
        id: '',
        name: '',
        description: '',
        professorId: '',
        assistantId: ''
      });
    } catch (error) {
      console.error('Error calling Subjects service:', error);
    }
  };

  const deleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/web/subjects/${id}`);
      const updatedSubjects = subjects.filter(subject => subject.id !== id);
      setSubjects(updatedSubjects);
    } catch (error) {
      console.error('Error calling Subjects service:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <h1>Microservice Frontend: Subjects</h1>

      <section className="add-subject">
        <h2>Add Subject</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter subject name"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter subject description"
            value={newSubject.description}
            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="professorId">Professor ID:</label>
          <input
            type="text"
            id="professorId"
            placeholder="Enter professor ID"
            value={newSubject.professorId}
            onChange={(e) => setNewSubject({ ...newSubject, professorId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="assistantId">Assistant ID:</label>
          <input
            type="text"
            id="assistantId"
            placeholder="Enter assistant ID"
            value={newSubject.assistantId}
            onChange={(e) => setNewSubject({ ...newSubject, assistantId: e.target.value })}
          />
        </div>
        <button className="add-button" onClick={addSubject}>Add Subject</button>
      </section>
  
      <section className="edit-subject">
        <h2>Edit Subject</h2>
        <div className="input-group">
          <label htmlFor="editSubjectId">Subject ID:</label>
          <input
            type="text"
            id="editSubjectId"
            placeholder="Enter subject ID"
            value={editedSubject.id}
            onChange={(e) => setEditedSubject({ ...editedSubject, id: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editName">Name:</label>
          <input
            type="text"
            id="editName"
            placeholder="Enter subject name"
            value={editedSubject.name}
            onChange={(e) => setEditedSubject({ ...editedSubject, name: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editDescription">Description:</label>
          <input
            type="text"
            id="editDescription"
            placeholder="Enter subject description"
            value={editedSubject.description}
            onChange={(e) => setEditedSubject({ ...editedSubject, description: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editProfessorId">Professor ID:</label>
          <input
            type="text"
            id="editProfessorId"
            placeholder="Enter professor ID"
            value={editedSubject.professorId}
            onChange={(e) => setEditedSubject({ ...editedSubject, professorId: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editAssistantId">Assistant ID:</label>
          <input
            type="text"
            id="editAssistantId"
            placeholder="Enter assistant ID"
            value={editedSubject.assistantId}
            onChange={(e) => setEditedSubject({ ...editedSubject, assistantId: e.target.value })}
          />
        </div>
        <button className="update-button" onClick={updateSubject}>Update Subject</button>
      </section>
  
      <section className="subject-list">
      <h2>Subjects:</h2>
      <ul className="subject-list">
        {subjects.map(subject => (
          <li key={subject.id} className="subject-item">
            <span>{subject.name}</span>
            <button className="delete-button" onClick={() => deleteSubject(subject.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
    </div>
  );  
}

export default App;
