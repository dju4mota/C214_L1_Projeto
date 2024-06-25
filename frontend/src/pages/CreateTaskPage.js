// src/pages/CreateTaskPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskManager from '../utils/TaskManager';
import '../styles/CreateTaskPage.css';

function CreateTaskPage({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() && description.trim() && dueDate) {
      const newtask=new TaskManager()
      newtask.addTask(taskName, description, dueDate);
      setTaskName('');
      setDescription('');
      setDueDate('');
      navigate('/board');
    }
  };

  return (
    <div className="create-task-page">
      <h1>Criar Nova Tarefa</h1>
      <form className="task-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome da Tarefa" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Descrição" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          required 
        />
        <button type="submit">Criar Tarefa</button>
      </form>
    </div>
  );
}

export default CreateTaskPage;
