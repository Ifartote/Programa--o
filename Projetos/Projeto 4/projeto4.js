window.onload = function () {
  fetch('http://localhost:3000/dados')
    .then(response => response.json())
    .then(dados => {
      const corpo = document.getElementById('corpoTabela');
      corpo.innerHTML = ''; // Limpa o conteúdo anterior

      dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.idade}</td>
          <td>${item.altura}</td>
          <td>${item.status}</td>
        `;
        corpo.appendChild(tr);
      });
    })
    .catch(erro => {
      console.error('Erro ao buscar dados:', erro);
      document.body.innerHTML += '<p style="color:red;">Erro ao carregar dados do banco.</p>';
    });
};
