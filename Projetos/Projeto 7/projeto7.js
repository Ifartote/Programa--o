window.onload = function () {
  fetch('http://localhost:3000/dados')
  .then(response => response.json())
  .then(dados => {
    const corpo = document.getElementById('corpoTabela');
    corpo.innerHTML = '';

    dados.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.modelo}</td>
        <td>${item.numeroSerie}</td>
        <td>${item.estado}</td>
        <td>${item.chip}</td>
        <td>${item.vendedor}</td>
        <td>${item.revenda}</td>
        <td>${item.saida}</td>
        `;
        corpo.appendChild(tr);
    });
  })
   .catch(erro => {
    console.error('Erro ao buscar dados:', erro);
    document.body.innerHTML += '<p style="color:red;">Erro ao carregar dados do banco.</p>';
   });
}
   
function adicionar() {
  const modal = document.querySelector("#modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

let editando = false;
let nomeOriginal = '';

// Enviar dados (inserir ou editar)
function enviarDados() {
  const modelo = document.getElementById('modeloInput').value;
  const numeroSerie = document.getElementById('numeroSerieInput').value;
  const estado = document.getElementById('estadoInput').value;
  const chip = document.getElementById('chipInput').value;
  const vendedor = document.getElementById('vendedorInput').value;
  const revenda = document.getElementById('revendaInput').value;
  const saida = document.getElementById('saidaInput').value; // valor no formato 'YYYY-MM-DD'

   // Verificação de campos obrigatórios
  if (!modelo || !numeroSerie || !estado) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Verificação básica de data
  if (!saida.match(/^\d{4}-\d{2}-\d{2}$/)) {
    alert("Data de saída inválida. Use o formato AAAA-MM-DD.");
    return;
  }

  // Objeto com os dados para envio
  const novoUsuario = {
    modelo,
    numeroSerie,
    estado,
    chip,
    vendedor,
    revenda,
    saida
  };

  // Verificação básica
  if (!saida.match(/^\d{4}-\d{2}-\d{2}$/)) {
    alert("Data de saída inválida. Use o formato AAAA-MM-DD.");
    return;
  }

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
  fetch('http://localhost:3000/dados', {
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
// Fechar modal e limpar campos
function fecharModal() {
  document.querySelector("#modal").style.display = "none";
  modeloInput.value = '';
  numeroSerieInput.value = '';
  estadoInput.value = '';
  chipInput.value = '';
  vendedorInput.value = '';
  revendaInput.value = '';
  saidaInput.value = '';
  editando = false;
  nomeOriginal = '';
}
