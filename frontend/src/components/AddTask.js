// src/components/AddTaskForm.js
import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    estado: 'To Do', // Estado padrão
    usuario: '',
    checklist: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task); // Passa o objeto task diretamente para o método onAddTask
    setTask({
      name: '',
      description: '',
      dueDate: '',
      estado: 'To Do', // Reseta para o estado padrão
      usuario: '',
      checklist: []
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nome da tarefa"
        value={task.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descrição"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select
        name="estado"
        value={task.estado}
        onChange={handleChange}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input
        type="text"
        name="usuario"
        placeholder="Usuário"
        value={task.usuario}
        onChange={handleChange}
      />
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}

export default AddTaskForm;
