import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:214/card');
      setCards(response.data);
    } catch (error) {
      console.error('Erro ao buscar os cards:', error);
    }
  };

  const createCard = async () => {
    try {
      await axios.post('http://localhost:214/card', {
        nome: newCardName,
        estado: '',
        descricao: '',
        data: 0,
        usuario: '1',
        checklist: [],
      });
      fetchCards(); // Atualiza a lista de cards após a criação do novo card
      setNewCardName(''); // Limpa o campo de input
    } catch (error) {
      console.error('Erro ao criar um novo card:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Cards</h1>
      <div>
        <input
          type="text"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
          placeholder="Nome do novo card"
        />
        <button onClick={createCard}>Criar Card</button>
      </div>
      <ul>
        {cards.map((card) => (
          <li key={card._id}>
            {card.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
