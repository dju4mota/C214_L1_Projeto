import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../components/Column';
import TaskManager from '../utils/TaskManager';
import '../styles/TaskBoardPage.css';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', name: 'Lavar louça', description: 'Lavar todos os pratos', dueDate: '2024-06-30', estado: 'To Do', usuario: '1', checklist: ['Comprar sabão', 'Encher a pia com água'] },
    'task-2': { id: 'task-2', name: 'Limpar casa', description: 'Limpar sala e cozinha', dueDate: '2024-07-01', estado: 'In Progress', usuario: '2', checklist: [] },
    'task-3': { id: 'task-3', name: 'Estudar React', description: 'Completar o tutorial oficial', dueDate: '2024-07-02', estado: 'To Do', usuario: '1', checklist: ['Ler a documentação', 'Implementar exemplos'] },
    'task-4': { id: 'task-4', name: 'Ir ao mercado', description: 'Comprar alimentos para a semana', dueDate: '2024-07-05', estado: 'Done', usuario: '3', checklist: ['Fazer lista de compras', 'Ir ao mercado'] },
    'task-5': { id: 'task-5', name: 'Fazer relatório', description: 'Escrever o relatório mensal', dueDate: '2024-07-10', estado: 'In Progress', usuario: '2', checklist: ['Coletar dados', 'Escrever relatório'] },
    'task-6': { id: 'task-6', name: 'Organizar arquivos', description: 'Organizar documentos importantes', dueDate: '2024-07-15', estado: 'To Do', usuario: '1', checklist: ['Revisar documentos', 'Arquivar em pastas'] },
    'task-7': { id: 'task-7', name: 'Exercícios físicos', description: 'Completar rotina de exercícios', dueDate: '2024-07-20', estado: 'Done', usuario: '3', checklist: ['Correr 5km', 'Fazer alongamento'] },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1', 'task-3', 'task-6'] },
    'column-2': { id: 'column-2', title: 'In Progress', taskIds: ['task-2', 'task-5'] },
    'column-3': { id: 'column-3', title: 'Done', taskIds: ['task-4', 'task-7'] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

function TaskBoardPage() {
  const [taskManager] = useState(new TaskManager(initialData));
  const [data, setData] = useState({
    tasks: taskManager.getTasks(),
    columns: taskManager.getColumns(),
    columnOrder: taskManager.getColumnOrder(),
  });
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setData({
      tasks: taskManager.getTasks(),
      columns: taskManager.getColumns(),
      columnOrder: taskManager.getColumnOrder(),
    });
  }, [taskManager]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleSaveTask = (updatedTask) => {
    taskManager.editTask(updatedTask);
    setData({
      tasks: taskManager.getTasks(),
      columns: taskManager.getColumns(),
      columnOrder: taskManager.getColumnOrder(),
    });
  };

  const handleDeleteTask = (taskId) => {
    taskManager.deleteTask(taskId);
    setData({
      tasks: taskManager.getTasks(),
      columns: taskManager.getColumns(),
      columnOrder: taskManager.getColumnOrder(),
    });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddTask = () => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      name: 'Nova Tarefa',
      description: 'Descrição da Nova Tarefa',
      dueDate: '2024-07-30',
      estado: 'To Do', // Forçando para a coluna "To Do"
      usuario: '1',
      checklist: [],
    };

    // Adicionar a nova tarefa ao TaskManager
    taskManager.addTask(newTask);

    // Atualizar o estado para refletir as mudanças
    setData({
      tasks: taskManager.getTasks(),
      columns: taskManager.getColumns(),
      columnOrder: taskManager.getColumnOrder(),
    });
  };

  const getFilteredTasks = (taskIds) => {
    const tasks = taskIds.map(taskId => data.tasks[taskId]);
    if (!searchText) return tasks;
    const lowercasedSearchText = searchText.toLowerCase();
    return tasks.filter(task => 
      task.name.toLowerCase().includes(lowercasedSearchText) || 
      task.description.toLowerCase().includes(lowercasedSearchText)
    );
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Pesquisar tarefas..." 
        className="search-bar" 
        value={searchText} 
        onChange={handleSearch} 
      />
      <button onClick={handleAddTask}>Adicionar Nova Tarefa</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-board">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = getFilteredTasks(column.taskIds);

            return (
              <Column 
                key={column.id} 
                column={column} 
                tasks={tasks} 
                onEditTask={handleSaveTask} 
                onDeleteTask={handleDeleteTask} 
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBoardPage;
