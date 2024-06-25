// src/components/DeleteTaskButton.js
import React from 'react';
import PropTypes from 'prop-types';

const DeleteTaskButton = ({ taskId, onDelete }) => {
  const handleClick = () => {
    onDelete(taskId);
  };

  return (
    <button className="delete-task-button" onClick={handleClick}>
      Excluir Tarefa
    </button>
  );
};

DeleteTaskButton.propTypes = {
  taskId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteTaskButton;
