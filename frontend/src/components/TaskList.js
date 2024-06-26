// src/components/TaskList.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import '../styles/TaskList.css';

function TaskList({ tasks, listId, onEditTask, onDeleteTask }) {
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} onSave={onEditTask} onDelete={onDeleteTask} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
