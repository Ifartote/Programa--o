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
        <td>${item.devolucao}</td>
        <td>${item.dias_vencer}</td>
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
  
  const novoUsuario = {
    modelo: modeloInput.value,
    numeroSerie: numeroSerieInput.value,
    estado: estadoInput.value,
    chip: chipInput.value,
    vendedor: vendedorInput.value,
    revenda: revendaInput.value,
    saida: saidaInput.value,

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

