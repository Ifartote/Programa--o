window.onload = function () {
fetch('http://localhost:3000/projetos/projeto4/dados')
    .then(response => response.json())
    .then(dados => {
        
      const corpo = document.getElementById('corpoTabela');
      corpo.innerHTML = '';

      dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.idade}</td>
          <td>${item.altura}</td>
          <td>${item.status}</td>
          <td>
            <button onclick="editarUsuario('${item.nome}', ${item.idade}, ${item.altura}, '${item.status}')">Editar</button>
            <button onclick="excluirUsuario('${item.nome}')">Excluir</button>
          </td>
        `;
        corpo.appendChild(tr);
      });
    })
    .catch(erro => {
      console.error('Erro ao buscar dados:', erro);
      document.body.innerHTML += '<p style="color:red;">Erro ao carregar dados do banco.</p>';
    });
};

// Mostrar/ocultar o modal
function adicionar() {
  const modal = document.querySelector("#modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

let editando = false;
let nomeOriginal = '';

// Enviar dados (inserir ou editar)
function enviarDados() {
  const altura = parseFloat(alturaInput.value.replace(',', '.'));
  const idade = parseInt(idadeInput.value);

  const novoUsuario = {
    nome: nomeInput.value,
    idade: idade,
    altura: altura,
    status: statusInput.value,
  };

  if (editando) {
    // EDITAR
    fetch(`http://localhost:3000/editar/${encodeURIComponent(nomeOriginal)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    })
      .then(response => {
        if (response.ok) {
          alert("Registro editado com sucesso!");
          fecharModal();
          window.onload();
        } else {
          alert("Erro ao editar.");
        }
      })
      .catch(error => {
        console.error("Erro ao editar:", error);
      });

  } else {
    // ADICIONAR
    fetch('http://localhost:3000/adicionar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    })
      .then(response => {
        if (response.ok) {
          alert("Dados inseridos com sucesso!");
          fecharModal();
          window.onload();
        } else {
          alert("Erro ao inserir dados.");
        }
      })
      .catch(error => {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar os dados.");
      });
  }
}

// Editar usuário (preenche campos e entra em modo edição)
function editarUsuario(nome, idade, altura, status) {
  nomeInput.value = nome;
  idadeInput.value = idade;
  alturaInput.value = altura;
  statusInput.value = status;

  document.querySelector("#modal").style.display = "flex";
  editando = true;
  nomeOriginal = nome;
}

// Excluir usuário
function excluirUsuario(nome) {
  if (confirm("Tem certeza que deseja excluir este registro?")) {
    fetch(`http://localhost:3000/excluir/${encodeURIComponent(nome)}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert("Registro excluído com sucesso.");
          window.onload();
        } else {
          alert("Erro ao excluir registro.");
        }
      })
      .catch(error => {
        console.error("Erro ao excluir:", error);
      });
  }
}

// Fechar modal e limpar campos
function fecharModal() {
  document.querySelector("#modal").style.display = "none";
  nomeInput.value = '';
  idadeInput.value = '';
  alturaInput.value = '';
  statusInput.value = '';
  editando = false;
  nomeOriginal = '';
}
