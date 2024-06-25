// src/components/EditTaskModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/EditTaskModal.css';

Modal.setAppElement('#root'); // Set root element for accessibility

function EditTaskModal({ task, isOpen, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...editedTask.checklist];
    newChecklist[index] = value;
    setEditedTask((prev) => ({ ...prev, checklist: newChecklist }));
  };

  const addChecklistItem = () => {
    setEditedTask((prev) => ({ ...prev, checklist: [...prev.checklist, ''] }));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-task-modal">
      <h2>Editar Tarefa</h2>
      <form>
        <label>
          Nome:
          <input type="text" name="name" value={editedTask.name} onChange={handleChange} />
        </label>
        <label>
          Descrição:
          <textarea name="description" value={editedTask.description} onChange={handleChange} />
        </label>
        <label>
          Data:
          <input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleChange} />
        </label>
        <label>
          Estado:
          <select name="estado" value={editedTask.estado} onChange={handleChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <label>
          Usuário:
          <input type="text" name="usuario" value={editedTask.usuario} onChange={handleChange} />
        </label>
        <label>
          Checklist:
          {editedTask.checklist.map((item, index) => (
            <div key={index} className="checklist-item">
              <input
                type="text"
                value={item}
                onChange={(e) => handleChecklistChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={addChecklistItem}>
            Adicionar Item
          </button>
        </label>
      </form>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </Modal>
  );
}

export default EditTaskModal;
