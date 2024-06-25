// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTaskPage from './pages/CreateTaskPage';
import TaskBoardPage from './pages/TaskBoardPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Criar Tarefa</Link>
          <Link to="/board">Quadro de Tarefas</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CreateTaskPage />} />
          <Route path="/board" element={<TaskBoardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
