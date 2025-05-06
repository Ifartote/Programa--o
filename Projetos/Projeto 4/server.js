const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Permite o uso de JSON no corpo da requisição
app.use(express.static(__dirname)); // Para servir arquivos estáticos

// Conexão com o banco MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'projeto_integração'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota GET para buscar os dados
app.get('/dados', (req, res) => {
  const sql = 'SELECT nome, idade, altura, status FROM integracao';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).send('Erro ao buscar dados');
    } else {
      res.json(results);
    }
  });
});

// 🆕 Rota POST para adicionar novos dados
app.post('/adicionar', (req, res) => {
  const { nome, idade, altura, status } = req.body;
  const sql = 'INSERT INTO integracao (nome, idade, altura, status) VALUES (?, ?, ?, ?)';

  connection.query(sql, [nome, idade, altura, status], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
    } else {
      res.status(200).send('Dados inseridos com sucesso');
    }
  });
});

app.delete('/excluir/:nome', (req, res) => {
  const nome = req.params.nome;
  const sql = 'DELETE FROM integracao WHERE nome = ?';

  connection.query(sql, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao excluir dados:', err);
      res.status(500).send('Erro ao excluir dados');
    } else {
      res.status(200).send('Registro excluído com sucesso');
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
