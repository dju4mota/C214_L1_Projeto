// src/components/Task.js
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import EditTaskModal from './EditTaskModal';
import '../styles/Task.css';

function Task({ task, index, onSave, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleOpenModal}
          >
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <small>{task.dueDate}</small>
            <button onClick={handleDelete} className="delete-task-button">Excluir</button>
          </div>
        )}
      </Draggable>
      <EditTaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={onSave}
      />
    </>
  );
}

export default Task;
