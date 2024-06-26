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
      this.data.tasks[id] = newTask;
      this.data.columns[`column-${estado.toLowerCase().replace(' ', '-')}`].taskIds.push(id);
    }
  
    editTask(updatedTask) {
      this.data.tasks[updatedTask.id] = updatedTask;
    }
  
    deleteTask(taskId) {
      delete this.data.tasks[taskId];
      for (let columnId in this.data.columns) {
        this.data.columns[columnId].taskIds = this.data.columns[columnId].taskIds.filter(id => id !== taskId);
      }
    }
  
    searchTasks(searchText) {
      if (!searchText) return Object.values(this.data.tasks);
      const lowercasedSearchText = searchText.toLowerCase();
      return Object.values(this.data.tasks).filter(task => 
        task.name.toLowerCase().includes(lowercasedSearchText) || 
        task.description.toLowerCase().includes(lowercasedSearchText)
      );
    }
  }
  