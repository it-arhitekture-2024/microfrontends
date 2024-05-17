import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    age: null,
    type: ''
  });
  const [editedUser, setEditedUser] = useState({
    id: '',
    name: '',
    surname: '',
    age: null,
    type: ''
  });

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/web/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error calling Users service:', error);
    }
  };

  useEffect(() => {
    fetchUser('661fb27296f408868d39a170'); // Replace with the actual user ID you want to fetch
  }, []);

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/web/users', newUser);
      setUser(response.data);
      setNewUser({
        name: '',
        surname: '',
        age: null,
        type: ''
      });
    } catch (error) {
      console.error('Error calling Users service:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:3000/web/users/${editedUser.id}`, editedUser);
      setUser({ ...user, ...editedUser });
      setEditedUser({
        id: '',
        name: '',
        surname: '',
        age: null,
        type: ''
      });
    } catch (error) {
      console.error('Error calling Users service:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/web/users/${id}`);
      setUser(null);
    } catch (error) {
      console.error('Error calling Users service:', error);
    }
  };

  return (
    <div>
      <h1>Microservice Frontend: Users</h1>

      {user ? (
        <div>
          <h2>User Details</h2>
          <ul className="user-list">
            <li key={user.id} className="user-item">
              <span>{user.name} {user.surname}</span>
              <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete Profile</button>
            </li>
          </ul>
        </div>
      ) : (
        <p>User deleted successfuly!</p>
      )}

      <section className="add-user">
        <h2>Add User</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter user name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            placeholder="Enter user surname"
            value={newUser.surname}
            onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            placeholder="Enter user age"
            value={newUser.age}
            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            placeholder="Enter user type"
            value={newUser.type}
            onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
          />
        </div>
        <button className="add-button" onClick={addUser}>Add User</button>
      </section>

      <section className="edit-user">
        <h2>Edit User</h2>
        <div className="input-group">
          <label htmlFor="editUserId">User ID:</label>
          <input
            type="text"
            id="editUserId"
            placeholder="Enter user ID"
            value={editedUser.id}
            onChange={(e) => setEditedUser({ ...editedUser, id: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editName">Name:</label>
          <input
            type="text"
            id="editName"
            placeholder="Enter user name"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editSurname">Surname:</label>
          <input
            type="text"
            id="editSurname"
            placeholder="Enter user surname"
            value={editedUser.surname}
            onChange={(e) => setEditedUser({ ...editedUser, surname: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editAge">Age:</label>
          <input
            type="number"
            id="editAge"
            placeholder="Enter user age"
            value={editedUser.age}
            onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="editType">Type:</label>
          <input
            type="text"
            id="editType"
            placeholder="Enter user type"
            value={editedUser.type}
            onChange={(e) => setEditedUser({ ...editedUser, type: e.target.value })}
          />
        </div>
        <button className="update-button" onClick={updateUser}>Update User</button>
      </section>
    </div>
  );
}

export default App;
