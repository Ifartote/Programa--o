// Carrega os dados da tabela ao abrir
window.onload = function () {
  fetch('http://localhost:3000/dados')
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
          <td><button onclick="excluirUsuario('${item.nome}')">Excluir</button></td>
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

// Enviar dados ao banco
function enviarDados() {
  const novoUsuario = {
    nome: nomeInput.value,
    idade: idadeInput.value,
    altura: alturaInput.value,
    status: statusInput.value,
  };

  fetch('http://localhost:3000/adicionar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(novoUsuario)
  })
  .then(response => {
    if (response.ok) {
      alert("Dados inseridos com sucesso!");
      document.querySelector("#modal").style.display = "none";

      // Limpa os campos do modal
      nomeInput.value = '';
      idadeInput.value = '';
      alturaInput.value = '';
      statusInput.value = '';

      // Atualiza a tabela
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

// Excluir registro do banco
function excluirUsuario(nome) {
  if (confirm("Tem certeza que deseja excluir este registro?")) {
    fetch(`http://localhost:3000/excluir/${encodeURIComponent(nome)}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        alert("Registro excluído com sucesso.");
        window.onload(); // Recarrega os dados
      } else {
        alert("Erro ao excluir registro.");
      }
    })
    .catch(error => {
      console.error("Erro ao excluir:", error);
    });
  }
}
