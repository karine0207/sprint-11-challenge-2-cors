const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
const API_URL = 'https://rickandmortyapi.com/api/character';

app.use(cors());


app.get('/characters', async (req, res) => {
  try {
    const { data } = await axios.get(API_URL);
   
    const characters = data.results.map(char => ({
      name: char.name,
      status: char.status,
      species: char.species,
      gender: char.gender,
      origin: char.origin.name,
      image: char.image,
    }));
    res.json(characters);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'No se pudieron obtener los personajes' });
  }
});


app.get('/characters/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const { data } = await axios.get(`${API_URL}/?name=${encodeURIComponent(name)}`);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    
    const char = data.results[0];
    const character = {
      name: char.name,
      status: char.status,
      species: char.species,
      gender: char.gender,
      origin: char.origin.name,
      image: char.image,
    };
    res.json(character);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: 'Personaje no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
