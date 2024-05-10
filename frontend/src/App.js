import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel, Box, Typography, Grid } from '@material-ui/core';
import { AssignmentTurnedIn, Schedule, PlayArrow, AssignmentLate, CheckCircle, Person } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = { status: this.props.status || 'concept' };
  }

  handleChange = (e) => {
    this.setState({ status: e.target.value });
    this.props.onStatusChange(e.target.value);
  };

  renderStatusIcon(status) {
    switch(status) {
      case 'concept':
        return <AssignmentLate />;
      case 'in progress':
        return <Schedule />;
      case 'running':
        return <PlayArrow />;
      case 'review':
        return <AssignmentTurnedIn />;
      case 'closed':
        return <CheckCircle />;
      default:
        return null;
    }
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <FormControl variant="outlined" style={{ minWidth: '120px' }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={this.handleChange} label="Status">
            <MenuItem value="concept">{this.renderStatusIcon('concept')} Concept</MenuItem>
            <MenuItem value="in progress">{this.renderStatusIcon('in progress')} In Progress</MenuItem>
            <MenuItem value="running">{this.renderStatusIcon('running')} Running</MenuItem>
            <MenuItem value="review">{this.renderStatusIcon('review')} Review</MenuItem>
            <MenuItem value="closed">{this.renderStatusIcon('closed')} Closed</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      newCard: {
        id: '',
        nome: '',
        estado: '',
        descricao: '',
        dataCriacao: '',
        dataFinalizacao: '',
        usuario: '',
        checklist: [],
      }
    };
  }

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:214/card/listar');
      this.setState({ cards: response.data });
    } catch (error) {
      console.error('Erro ao buscar os cards:', error);
    }
  };

  createCard = async () => {
    const { newCard } = this.state;
    try {
      const cardData = { ...newCard, id: uuidv4(), dataCriacao: new Date().toISOString() };
      await axios.post('http://localhost:214/card', cardData);
      this.fetchCards();
      this.setState({ 
        newCard: {
          ...newCard,
          id: '',
          nome: '',
          estado: '',
          descricao: '',
          dataCriacao: '',
          dataFinalizacao: '',
          usuario: '',
          checklist: [],
        } 
      });
    } catch (error) {
      console.error('Erro ao criar um novo card:', error);
    }
  };

  handleInputChange = (e) => {
    this.setState({ 
      newCard: {
        ...this.state.newCard,
        [e.target.name]: e.target.value
      } 
    });
  };

  handleStatusChange = (status) => {
    this.setState({
      newCard: {
        ...this.state.newCard,
        estado: status
      }
    });
  };

  render() {
    const { cards, newCard } = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f0f0' }}>
        <Box p={3} boxShadow={3} borderRadius={8} bgcolor="white">
          <Typography variant="h3" gutterBottom align="center">Lista de Cards</Typography>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField name="nome" value={newCard.nome} onChange={this.handleInputChange} label="Nome do novo card" variant="outlined" fullWidth />
            </Grid>
            <Grid item>
              <Checklist 
                status={newCard.estado}
                onStatusChange={this.handleStatusChange}
              />
            </Grid>
            <Grid item>
              <TextField name="descricao" value={newCard.descricao} onChange={this.handleInputChange} label="Descrição do novo card" variant="outlined" fullWidth />
            </Grid>
            <Grid item>
              <TextField name="dataFinalizacao" value={newCard.dataFinalizacao} onChange={this.handleInputChange} label="Data de Finalização" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Usuário do novo card</InputLabel>
                <Select
                  name="usuario"
                  value={newCard.usuario}
                  onChange={this.handleInputChange}
                  label="Usuário do novo card"
                >
                  <MenuItem value="Fernando"><Person /> Fernando</MenuItem>
                  <MenuItem value="Gustavo"><Person /> Gustavo</MenuItem>
                  <MenuItem value="Lucas"><Person /> Lucas</MenuItem>
                  <MenuItem value="Samuel"><Person /> Samuel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={this.createCard} fullWidth>Criar Card</Button>
            </Grid>
          </Grid>
          <List style={{ marginTop: '20px' }}>
            {cards.map((card) => (
              <ListItem key={card.id}>
                <ListItemText 
                  primary={card.nome} 
                  secondary={`Estado: ${card.estado}, Descrição: ${card.descricao}, Data de Criação: ${new Date(card.dataCriacao).toLocaleDateString()}, Data de Finalização: ${card.dataFinalizacao ? new Date(card.dataFinalizacao).toLocaleDateString() : 'Não definida'}`} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    );
  }
}

export default App;
