// src/components/TaskList.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import '../styles/TaskList.css';

function TaskList({ tasks, listId }) {
  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
