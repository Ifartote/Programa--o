
window.onload = function () {
fetch('http://localhost:3000/projeto7/dados')
    .then(response => response.json())
    .then(dados => {
       console.log("DADOS RECEBIDOS:", dados);
      const corpo = document.getElementById('corpoTabela');
      corpo.innerHTML = '';

      dados.forEach(item => {
        const tr = document.createElement('tr');

        const dataSaidaObj = new Date(item.saida);
        const dataSaidaFormatada = !isNaN(dataSaidaObj)
          ? dataSaidaObj.toLocaleDateString('pt-BR')
          : 'Data inválida';

        const dataDevolucaoObj = new Date(dataSaidaObj);
        dataDevolucaoObj.setDate(dataSaidaObj.getDate() + 90);
        const dataDevolucaoFormatada = dataDevolucaoObj.toLocaleDateString('pt-BR');

        const hoje = new Date();
        const diffDias = Math.ceil((dataDevolucaoObj - hoje) / (1000 * 60 * 60 * 24));

        let status = '';
        let statusClasse = '';

        if (diffDias > 15) {
          status = 'OK';
          statusClasse = 'status-ok';
        } else if (diffDias > 0) {
          status = 'A Vencer';
          statusClasse = 'status-avencer';
        } else {
          status = 'Vencido';
          statusClasse = 'status-vencido';
        }

        tr.innerHTML = `
          <td>${item.modelo}</td>
          <td>${item.numeroSerie}</td>
          <td>${item.estado}</td>
          <td>${item.chip}</td>
          <td>${item.vendedor}</td>
          <td>${item.revenda}</td>
          <td>${dataSaidaFormatada}</td>
          <td>${dataDevolucaoFormatada}</td>
          <td>${diffDias} dias</td>
          <td class="${statusClasse}">${status}</td>
          <td>
            <button onclick="editarUsuario('${item.modelo}', '${item.numeroSerie}', '${item.estado}', '${item.chip}', '${item.vendedor}', '${item.revenda}', '${item.saida}')">Editar</button>
            <button onclick="excluirUsuario('${item.modelo}')">Excluir</button>
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

function adicionar() {
  const modal = document.querySelector("#modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

let editando = false;
let modeloOriginal = '';

function enviarDados() {
  const modelo = document.getElementById('modeloInput').value;
  const numeroSerie = document.getElementById('numeroSerieInput').value;
  const estado = document.getElementById('estadoInput').value;
  const chip = document.getElementById('chipInput').value;
  const vendedor = document.getElementById('vendedorInput').value;
  const revenda = document.getElementById('revendaInput').value;
  const saida = document.getElementById('saidaInput').value;

  if (!modelo || !numeroSerie || !estado) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!saida.match(/^\d{4}-\d{2}-\d{2}$/)) {
    alert("Data de saída inválida. Use o formato AAAA-MM-DD.");
    return;
  }

  const novoUsuario = { modelo, numeroSerie, estado, chip, vendedor, revenda, saida };

  if (editando) {
    fetch(`http://localhost:3000/projetos/projeto7/dados/${encodeURIComponent(modeloOriginal)}`, {
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
    fetch('http://localhost:3000/projetos/projeto7/dados', {
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

function editarUsuario(modelo, numeroSerie, estado, chip, vendedor, revenda, saida) {
  modeloInput.value = modelo;
  numeroSerieInput.value = numeroSerie;
  estadoInput.value = estado;
  chipInput.value = chip;
  vendedorInput.value = vendedor;
  revendaInput.value = revenda;
  saidaInput.value = saida;

  document.querySelector("#modal").style.display = "flex";
  editando = true;
  modeloOriginal = modelo;
}

function excluirUsuario(modelo) {
  if (confirm("Tem certeza que deseja excluir este registro?")) {
    fetch(`http://localhost:3000/projetos/projeto7/dados/${encodeURIComponent(modelo)}`, {
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
  modeloOriginal = '';
}
