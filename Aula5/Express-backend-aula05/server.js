// Importa o Express, Body-Parser e FS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FILE = 'data.json';

// Permite o frontend publicado e o ambiente local, incluindo o preflight OPTIONS.
app.use(cors({
  origin: ['https://expressfrontendaula5.vercel.app', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Função para ler arquivo
function readNotes() {
  try {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Função para salvar arquivo
function saveNotes(notes) {
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

// ====================
// GET - Listar notas
// ====================
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// ====================
// POST - Criar nota
// ====================
app.post('/api/notes', (req, res) => {
  const notes = readNotes();

  const novaNota = {
    id: Date.now().toString(),
    titulo: req.body.titulo,
    texto: req.body.texto,
    criadoEm: new Date().toISOString()
  };

  notes.push(novaNota);
  saveNotes(notes);

  res.json(novaNota);
});

// ====================
// PUT - Editar nota
// ====================
app.put('/api/notes/:id', (req, res) => {
  const notes = readNotes();

  const index = notes.findIndex(n => n.id === req.params.id);

  if (index >= 0) {
    notes[index].titulo = req.body.titulo;
    notes[index].texto = req.body.texto;

    saveNotes(notes);
    res.json(notes[index]);
  } else {
    res.status(404).json({ erro: 'Nota não encontrada' });
  }
});

// ====================
// DELETE - Excluir nota
// ====================
app.delete('/api/notes/:id', (req, res) => {
  const notes = readNotes();

  const novasNotas = notes.filter(n => n.id !== req.params.id);

  saveNotes(novasNotas);

  res.json({ mensagem: 'Nota removida' });
});

// ====================
// Inicia servidor
// ====================
app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
