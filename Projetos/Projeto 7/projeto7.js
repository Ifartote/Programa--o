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
        <td>${item.numero_serie}</td>
        <td>${item.estad}</td>
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
    numero_serie: numero_serie.value,
    estado: estado,
    status: statusInput.value,
  };
}