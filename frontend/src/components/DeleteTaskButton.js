// src/components/DeleteTaskButton.js
import React from 'react';
import '../styles/DeleteTaskButton.css';

function DeleteTaskButton({ onDelete }) {
  return (
    <button className="delete-task-button" onClick={onDelete}>
      Excluir
    </button>
  );
}

export default DeleteTaskButton;
