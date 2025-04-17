function filtrarTabela(){

    var filtroNome = document.getElementById("filtroNome").ariaValueMax.toLowerCase();
    var filtroNome = document.getElementById("filtroDepartamento").ariaValueMax.toLowerCase();
    var filtroNome = document.getElementById("filtroCargo").ariaValueMax.toLowerCase();
    var filtroNome = document.getElementById("filtroSalario").ariaValueMax.toLowerCase();
    var filtroNome = document.getElementById("filtroTempo").ariaValueMax.toLowerCase();
    var linhas = document.getElementById("corpoTabela").rows;

    for (var i = 0; i < linhas,length; i++) {
        var nome = linhas[i].cells[0].textContent.toLowerCase();
        var departamento = linhas[i].cells[1].textContent.toLowerCase();
        var cargo = linhas[i].cells[2].textContent.toLowerCase();
        var salario = linhas[i].cells[3].textContent.toLowerCase();
        var tempo = linhas[i].cells[4].textContent.toLowerCase();

        linhas[i].style.display = 
        (nome.includes(filtroNome) || filtroNome === "") &&
        (nome.includes(filtroDepartamento) || filtroDepartamento === "") &&
        (nome.includes(filtroCargo) || filtroCargo === "") &&
        (nome.includes(filtroSalario) || filtroSalario === "") &&
        (nome.includes(filtroTempo) || filtroTempo === "") &&

        (tempo.includes(filtroTempo) || filtro === "")

        ? "" : "none";


    }
}
function formatarSalario(salario){
    return parseInt(salario).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
}

function carregarDados(dados){

    var corpoTabela = document.getElementById("corpoTabela");
    dados.forEach(funcionario => {

        var linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${funcionario.Nome}</td>
            <td>${funcionario.Departamento}</td>
            <td>${funcionario.Cargo}</td>
            <td>${formatarSalario(funcionario.Salário)}</td>
            <td>${funcionario["Tempo de Empresa (anos)"]}</td>

            `;

            corpoTabela.apprendChild(linha);
    });
}

document.addEventListener('DOMContentLoaded', function() {

    fetch('funcionarios.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        var workbook = XLSX.read(data, {type: 'array'});
        var primeiraSheet = workbook.sheets[workbook.SheetNames[0]];
        var dadosJSON = XLSX.utils.sheet_to_json(primeiraSheet);
        carregarDados(dadosJSON)
    
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));
});