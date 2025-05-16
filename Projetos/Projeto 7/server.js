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
  user: 'root',       // <-- substitua pelo seu usuário do MySQL
  password: '123456',     // <-- substitua pela sua senha
  database: 'engenhariapoc'      // <-- substitua pelo nome do seu banco
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota para obter todos os registros
app.get('/dados', (req, res) => {
  const sql = 'SELECT modelo, numeroSerie, estado, chip, vendedor, revenda, saida FROM bodycam';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).json({ error: 'Erro ao buscar dados' });
      return;
    }
    res.json(results);
  });
});

// Rota para adicionar um novo registro
app.post('/dados', (req, res) => {
  const { modelo, numeroSerie, estado, chip, vendedor, revenda, saida } = req.body;
  const sql = 'INSERT INTO bodycam (modelo, numeroSerie, estado, chip, vendedor, revenda, saida) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [modelo, numeroSerie, estado, chip, vendedor, revenda, saida], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).json({ error: 'Erro ao inserir dados' });
      return;
    }
    res.json({ message: 'Registro inserido com sucesso' });
  });
});

// Rota para atualizar um registro
app.put('/dados/:id', (req, res) => {
  const id = req.params.id;
  const { modelo, numeroSerie, estado, chip, vendedor, revenda, saida } = req.body;
  const sql = 'UPDATE bodycam SET modelo = ?, numeroSerie = ?, estado = ?, chip = ?, vendedor = ?, revenda = ?, saida = ? WHERE id = ?';
  connection.query(sql, [modelo, numeroSerie, estado, chip, vendedor, revenda, saida, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar dados:', err);
      res.status(500).json({ error: 'Erro ao atualizar dados' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para deletar um registro
app.delete('/dados/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM bodycam WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar dados:', err);
      res.status(500).json({ error: 'Erro ao deletar dados' });
      return;
    }
    res.json({ message: 'Registro deletado com sucesso' });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
