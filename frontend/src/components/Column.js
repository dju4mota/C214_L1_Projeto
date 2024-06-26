// src/components/Column.js
import React from 'react';
import TaskList from './TaskList';
import '../styles/Column.css';

function Column({ column, tasks }) {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <TaskList tasks={tasks} listId={column.id} />
    </div>
  );
}

export default Column;
