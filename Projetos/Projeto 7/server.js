const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'programa_o'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// GET - Listar todos os dados
app.get('/dados', (req, res) => {
  const sql = 'SELECT * FROM inv_bodycam';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).json({ error: 'Erro ao buscar dados' });
      return;
    }
    res.json(results);
  });
});

// POST - Adicionar novo registro
app.post('/dados', (req, res) => {
  const { modelo, numeroSerie, estado, chip, vendedor, revenda, saida } = req.body;
  const sql = 'INSERT INTO inv_bodycam (modelo, numeroSerie, estado, chip, vendedor, revenda, saida) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [modelo, numeroSerie, estado, chip, vendedor, revenda, saida], (err) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).json({ error: 'Erro ao inserir dados' });
      return;
    }
    res.json({ message: 'Registro inserido com sucesso' });
  });
});

// PUT - Atualizar um registro existente por ID
app.put('/dados/:id', (req, res) => {
  const id = req.params.id;
  const { modelo, numeroSerie, estado, chip, vendedor, revenda, saida } = req.body;
  const sql = 'UPDATE inv_bodycam SET modelo = ?, numeroSerie = ?, estado = ?, chip = ?, vendedor = ?, revenda = ?, saida = ? WHERE id = ?';
  connection.query(sql, [modelo, numeroSerie, estado, chip, vendedor, revenda, saida, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar dados:', err);
      res.status(500).json({ error: 'Erro ao atualizar dados' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// DELETE - Excluir um registro por ID
app.delete('/dados/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM inv_bodycam WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) {
      console.error('Erro ao deletar dados:', err);
      res.status(500).json({ error: 'Erro ao deletar dados' });
      return;
    }
    res.json({ message: 'Registro deletado com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
