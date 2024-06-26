// src/utils/TaskManager.js

export default class TaskManager {
  constructor(initialData) {
    this.data = { ...initialData };
  }

  getTasks() {
    return this.data.tasks;
  }

  getColumns() {
    return this.data.columns;
  }

  getColumnOrder() {
    return this.data.columnOrder;
  }

  addTask(newTask) {
    const { id, estado } = newTask;

    // Garantir que newTask esteja definido e contenha as propriedades necessárias
    if (!newTask || !id || !estado) {
      console.error('Invalid newTask object:', newTask);
      return;
    }

    // Garantir que this.data.tasks e this.data.columns estejam inicializados
    if (!this.data.tasks) {
      this.data.tasks = {};
    }

    if (!this.data.columns) {
      this.data.columns = {};
    }

    // Adicionar a tarefa a this.data.tasks
    this.data.tasks[id] = newTask;

    // Forçar a adição da tarefa à coluna 'To Do' se não estiver especificada
    const columnKey = `column-1`; // 'To Do' column
    if (!this.data.columns[columnKey]) {
      this.data.columns[columnKey] = { id: columnKey, title: 'To Do', taskIds: [] };
    }

    // Adicionar o id da tarefa ao array taskIds da coluna correspondente
    this.data.columns[columnKey].taskIds.push(id);
  }

  editTask(updatedTask) {
    this.data.tasks[updatedTask.id] = updatedTask;
  }

  deleteTask(taskId) {
    delete this.data.tasks[taskId];
    for (let columnId in this.data.columns) {
      this.data.columns[columnId].taskIds = this.data.columns[columnId].taskIds.filter(
        (id) => id !== taskId
      );
    }
  }

  searchTasks(searchText) {
    if (!searchText) return Object.values(this.data.tasks);
    const lowercasedSearchText = searchText.toLowerCase();
    return Object.values(this.data.tasks).filter(
      (task) =>
        task.name.toLowerCase().includes(lowercasedSearchText) ||
        task.description.toLowerCase().includes(lowercasedSearchText)
    );
  }
}
