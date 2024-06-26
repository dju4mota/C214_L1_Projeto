// initialData.js

const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Tarefa 1', status: 'todo' },
      'task-2': { id: 'task-2', content: 'Tarefa 2', status: 'todo' },
      'task-3': { id: 'task-3', content: 'Tarefa 3', status: 'doing' },
      'task-4': { id: 'task-4', content: 'Tarefa 4', status: 'done' },
    },
    columns: {
      'todo': {
        id: 'todo',
        title: 'A Fazer',
        taskIds: ['task-1', 'task-2'],
      },
      'doing': {
        id: 'doing',
        title: 'Em Progresso',
        taskIds: ['task-3'],
      },
      'done': {
        id: 'done',
        title: 'Concluído',
        taskIds: ['task-4'],
      },
    },
    columnOrder: ['todo', 'doing', 'done'],
  };
  
  export default initialData;
  