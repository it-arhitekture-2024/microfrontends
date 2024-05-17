import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Navigation = () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/grades">Grades</Link>
        </li>
        <li>
          <Link to="/subjects">Subjects</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  </Router>
);

export default Navigation;
