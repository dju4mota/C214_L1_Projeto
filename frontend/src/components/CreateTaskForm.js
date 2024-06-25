// src/components/CreateTaskForm.js
import React, { useState } from 'react';
import '../styles/CreateTaskForm.css';

function CreateTaskForm({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() && description.trim() && dueDate) {
      addTask(taskName, description, dueDate);
      setTaskName('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
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
  );
}

export default CreateTaskForm;
