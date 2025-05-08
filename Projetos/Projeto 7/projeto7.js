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
            <td>${item.estado}</td>
            <td>${item.chip}</td>
            <td>${item.vendedor}</td>
            <td>${item.revenda}</td>
            <td>${new Date(item.saida).toLocaleDateString()}</td>
            <td>${new Date(item.devolucao).toLocaleDateString()}</td>
            <td>${item.dias_a_vencer}</td>
            <td>
              <button onclick="editarUsuario('${item.numero_serie}')">Editar</button>
              <button onclick="excluirUsuario('${item.numero_serie}')">Excluir</button>
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

function enviarDados() {
    const dados = {
        modelo: modeloInput.value,
        numero_serie: numeroSerieInput.value,
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
          body: JSON.stringify(dados)
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
          body: JSON.stringify(dados)
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

    
// Editar usuário (preenche campos e entra em modo edição)           Não alterei a partir daqui!!!
function editarUsuario(modelo, estado, chip, vendedor, revenda, saida ) {
    modeloInput.value = modelo;
    estadoInput.value = estado;
    chipInput.value = chip;
    vendedorInput.value = vendedor;
    revendaInput.value = revenda;
    saidaInput.value = saida;
  
    document.querySelector("#modal").style.display = "flex";
    editando = true;
    nomeOriginal = modelo;
  }
  
  // Excluir usuário
  function excluirUsuario(nome) {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
      fetch(`http://localhost:3000/excluir/${encodeURIComponent(modelo)}`, {
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
    modeloInput.value = '';
    estadoInput.value = '';
    chipInput.value = '';
    vendedorInput.value = '';
    revendaInput.value = '';
    saidaInput.value = '';
    editando = false;
    numero_serie = '';
  }
  