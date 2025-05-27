//Verificar caminho das pastas

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MySQL (compartilhada para ambos os projetos)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'programa_o'
});

// Verificar e criar tabelas se não existirem
function criarTabelas() {
  // Tabela do Projeto 4 (inv_bodycam)
  connection.query(`
    CREATE TABLE IF NOT EXISTS inv_bodycam (
      id INT AUTO_INCREMENT PRIMARY KEY,
      modelo VARCHAR(255),
      numeroSerie VARCHAR(255),
      estado VARCHAR(255),
      chip VARCHAR(255),
      vendedor VARCHAR(255),
      revenda VARCHAR(255),
      saida VARCHAR(255)
    )
  `, (err) => {
    if (err) console.error('Erro ao criar tabela inv_bodycam:', err);
    else console.log('Tabela inv_bodycam verificada/criada');
  });

  // Tabela do Projeto 7 (integracao)
  connection.query(`
    CREATE TABLE IF NOT EXISTS integracao (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255),
      idade INT,
      altura DECIMAL(5,2),
      status VARCHAR(255)
    )
  `, (err) => {
    if (err) console.error('Erro ao criar tabela integracao:', err);
    else console.log('Tabela integracao verificada/criada');
  });
}

// Conectar ao MySQL e criar tabelas
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
  criarTabelas();
});

// ==================== ROTAS DO PROJETO 4 ====================

// GET - Listar todos os dados do Projeto 4
app.get('/projetos/projeto4/dados', (req, res) => {
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

// POST - Adicionar novo registro no Projeto 4
app.post('/projetos/projeto4/dados', (req, res) => {
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

// PUT - Atualizar um registro existente por ID no Projeto 4
app.put('/projetos/projeto4/dados/:id', (req, res) => {
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

// DELETE - Excluir um registro por ID no Projeto 4
app.delete('/projetos/projeto4/dados/:id', (req, res) => {
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

// ==================== ROTAS DO PROJETO 7 ====================

// Rota GET para buscar os dados do Projeto 7
app.get('/projeto7/dados', (req, res) => {
  const sql = 'SELECT id, nome, idade, altura, status FROM integracao';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).send('Erro ao buscar dados');
    } else {
      res.json(results);
    }
  });
});

// Rota POST para adicionar novos dados no Projeto 7
app.post('/projeto7/adicionar', (req, res) => {
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

// Rota DELETE para excluir dados no Projeto 7
app.delete('/projeto7/excluir/:nome', (req, res) => {
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

// Rota PUT para editar dados no Projeto 7
app.put('/projeto7/editar/:nomeOriginal', (req, res) => {
  const nomeOriginal = req.params.nomeOriginal;
  const { nome, idade, altura, status } = req.body;
  const sql = 'UPDATE integracao SET nome = ?, idade = ?, altura = ?, status = ? WHERE nome = ?';
  connection.query(sql, [nome, idade, altura, status, nomeOriginal], (err, result) => {
    if (err) {
      console.error('Erro ao editar dados:', err);
      res.status(500).send('Erro ao editar dados');
    } else {
      res.status(200).send('Registro atualizado com sucesso');
    }
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor unificado dos Projetos 4 e 7 rodando!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor unificado rodando em http://localhost:${port}`);
});