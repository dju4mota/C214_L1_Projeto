// src/pages/ListSearchPage.js
import React, { useState } from 'react';
import '../styles/ListSearchPage.css';

const ListSearchPage = () => {
  const [userId, setUserId] = useState('');
  const [lists, setLists] = useState([]);
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetchListsForUser(userId);
      setLists(response);
      setError('');
    } catch (error) {
      console.error('Error fetching lists:', error);
      setLists([]);
      setError('Ocorreu um erro ao buscar as listas.');
    }
  };

  const fetchListsForUser = async (userId) => {
    // Aqui você faria a chamada real para a API para buscar as listas do usuário
    // Por enquanto, estamos apenas simulando um retorno de dados estáticos
    // Substitua esta parte com sua lógica de chamada de API real

    // Simulação de dados estáticos para demonstração
    const lists = [
      { id: 1, name: 'Lista 1', description: 'Descrição da Lista 1' },
      { id: 2, name: 'Lista 2', description: 'Descrição da Lista 2' },
    ];
    return lists;
  };

  return (
    <div className="search-container">
      <h1>Buscar listas</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="userId">ID do usuário:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          placeholder="Insira o ID do usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="list-results">
        {lists.length > 0 ? (
          lists.map((list) => (
            <div key={list.id} className="list-item">
              <h3>{list.name}</h3>
              <p>{list.description}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma lista encontrada para o usuário.</p>
        )}
      </div>
    </div>
  );
};

export default ListSearchPage;
