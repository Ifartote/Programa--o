function filtrarTabela() {
    // Declaração da função `filtrarTabela`. Esta função será
            // chamada para filtrar as linhas da tabela com base nos 
            // valores inseridos nos campos de filtro.

    var filtroNome = document.getElementById("filtroNome").value.toLowerCase();
    // Acessa o valor do campo de entrada com o ID 'filtroNome', 
            // obtém o valor textual inserido, e o converte 
            // para minúsculas.
    // Isso é usado para realizar comparações de filtragem que 
            // não diferenciam maiúsculas de minúsculas.

    var filtroDepartamento = document.getElementById("filtroDepartamento").value.toLowerCase();
    // Similar ao anterior, mas acessa o valor do campo de entrada 
            // para o departamento, permitindo filtrar as linhas da 
            // tabela por departamento.

    var filtroCargo = document.getElementById("filtroCargo").value.toLowerCase();
    // Similar ao anterior, mas para o campo de entrada do cargo. 
            // Permite filtrar as linhas da tabela por cargo.

    var filtroSalario = document.getElementById("filtroSalario").value.toLowerCase();
    // Similar ao anterior, mas para o campo de entrada do salário. 
            // Permite filtrar as linhas da tabela por salário.
    // É importante observar que esta abordagem simples de filtragem 
            // por salário pode não ser ideal se os salários forem 
            // formatados (por exemplo, "R$ 1.000,00") pois `toLowerCase()` 
            /// não afeta números.

    var filtroTempo = document.getElementById("filtroTempo").value.toLowerCase();
    // Similar ao anterior, mas para o campo de entrada do tempo 
            // de empresa. Permite filtrar as linhas da tabela pelo 
            // tempo de empresa em anos.

    var linhas = document.getElementById("corpoTabela").rows;
    // Acessa o elemento tbody da tabela pelo seu ID 'corpoTabela' e 
            // obtém todas as suas linhas (`tr`) como uma coleção HTML.
    // Este objeto será usado para iterar sobre as linhas e aplicar 
            // os filtros de pesquisa.

    // Este loop 'for' itera sobre cada linha na tabela de 
            // funcionários para aplicar os filtros.
    for (var i = 0; i < linhas.length; i++) {

        // Acessa o texto dentro da primeira célula (Nome) da linha 
                // atual, converte para minúsculas para padronizar a comparação.
        var nome = linhas[i].cells[0].textContent.toLowerCase();

        // Acessa o texto dentro da segunda célula (Departamento) da 
                // linha atual e o converte para minúsculas.
        var departamento = linhas[i].cells[1].textContent.toLowerCase();

        // Acessa o texto dentro da terceira célula (Cargo) da 
                // linha atual e o converte para minúsculas.
        var cargo = linhas[i].cells[2].textContent.toLowerCase();

        // Acessa o texto dentro da quarta célula (Salário) da 
                // linha atual e o converte para minúsculas.
        // Aqui, note que se os salários tiverem formatos especiais, 
                // como moeda, essa simples conversão para minúsculas 
                // pode não ser suficiente para comparações precisas.
        var salario = linhas[i].cells[3].textContent.toLowerCase();

        // Acessa o texto dentro da quinta célula (Tempo de Empresa) 
                // da linha atual e o converte para minúsculas.
        var tempo = linhas[i].cells[4].textContent.toLowerCase();

        // Define a visibilidade da linha atual com base nos 
                // critérios de filtro.
        // A propriedade 'style.display' controla se uma 
                // linha é visível ou não.
        linhas[i].style.display =

            // Verifica se o nome na célula contém o texto 
                    // filtrado ou se o campo de filtro está vazio.
            (nome.includes(filtroNome) || filtroNome === "") &&

            // Verifica se o departamento na célula contém o texto 
                    // filtrado ou se o campo de filtro está vazio.
            (departamento.includes(filtroDepartamento) || filtroDepartamento === "") &&

            // Verifica se o cargo na célula contém o texto filtrado 
                    // ou se o campo de filtro está vazio.
            (cargo.includes(filtroCargo) || filtroCargo === "") &&

            // Verifica se o salário na célula contém o texto 
                    // filtrado ou se o campo de filtro está vazio.
            (salario.includes(filtroSalario) || filtroSalario === "") &&

            // Verifica se o tempo de empresa na célula contém o 
                    // texto filtrado ou se o campo de filtro está vazio.
            (tempo.includes(filtroTempo) || filtroTempo === "")

            ? "" : "none";  // Se todas as condições forem verdadeiras, 
                            // mostra a linha (`""` significa visível). Se alguma 
                            // condição não for verdadeira, esconde a linha (`"none"`).

    }

}


function formatarSalario(salario) {
    // Definição da função 'formatarSalario'. Esta função recebe um 
            // parâmetro chamado 'salario', que se espera ser um valor 
            // numérico ou uma string que possa ser convertida em um número.

    return parseFloat(salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // O corpo da função realiza duas operações principais 
            // sobre o 'salario' recebido:

    // 1. parseInt(salario):
    //    - 'parseInt' é uma função que tenta converter seu 
            // argumento para um número inteiro.
    //    - Por exemplo, se 'salario' é a string "2000.99" ou "2000", 
            // 'parseInt' irá converter isso para o número 2000.
    //    - Isso é útil para garantir que o valor a ser formatado 
            // esteja no tipo de dado correto (número).

    // 2. toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }):
    //    - 'toLocaleString' é um método que formata um número para 
            // uma string de acordo com as convenções de uma 
            // localidade específica.
    //    - 'pt-BR' é o código de localidade para o Português do Brasil.
    //    - O objeto { style: 'currency', currency: 'BRL' } especifica 
            // que o número deve ser formatado como uma moeda, 
            // usando o Real Brasileiro ('BRL').
    //    - Isso transforma, por exemplo, o número 2000 em "R$ 2.000,00", 
            // que é a maneira como os valores monetários são 
            // tipicamente representados no Brasil.

    // A função então retorna este valor formatado, que pode ser 
            // usado em qualquer lugar da aplicação que necessite 
            // mostrar um valor salarial de forma legível e 
            // localmente adequada.

}

function carregarDados(dados) {
    // Define a função 'carregarDados', que é responsável por 
            // popular uma tabela HTML com dados fornecidos.
    // O parâmetro 'dados' é esperado para ser uma lista de 
            // objetos, onde cada objeto representa um funcionário 
            // com suas informações.

    var corpoTabela = document.getElementById("corpoTabela");
    // Acessa o elemento tbody da tabela no HTML pelo seu ID 'corpoTabela'.
    // 'document.getElementById' é uma função que retorna o 
            // elemento do DOM (Modelo de Objeto do Documento) 
            // com o ID especificado.
    // 'corpoTabela' agora é uma referência ao corpo da tabela 
            // onde as linhas de dados serão inseridas.

    dados.forEach(funcionario => {
        // Inicia um loop para iterar sobre cada objeto no array 'dados'.
        // 'forEach' é um método de array que executa uma função 
                // para cada item no array. Aqui, 'funcionario' 
                // representa um item individual do array 'dados'.

        var linha = document.createElement("tr");
        // Cria um novo elemento de linha da tabela (tr) e armazena-o 
                // na variável 'linha'.
        // 'document.createElement' é uma função que cria um novo 
                // elemento HTML especificado pelo nome da tag, neste caso, "tr".

        linha.innerHTML = `
            <td>${funcionario.Nome}</td>
            <td>${funcionario.Departamento}</td>
            <td>${funcionario.Cargo}</td>
            <td>${formatarSalario(funcionario.Salário)}</td>
            <td>${funcionario["Tempo de Empresa (anos)"]}</td>
        `;
        // Define o conteúdo interno da linha (HTML interno).
        // Cada 'td' representa uma célula na linha da tabela.
        // As expressões dentro das chaves `${}` são substituídas 
                // pelos valores das propriedades correspondentes 
                // do objeto 'funcionario'.
        // 'formatarSalario' é chamada para formatar o salário do 
                // funcionário em um formato de moeda adequado.

        corpoTabela.appendChild(linha);
        // Adiciona a linha recém-criada ao corpo da tabela 'corpoTabela'.
        // 'appendChild' é um método que adiciona um elemento ao final 
                // de uma lista de filhos de um elemento pai especificado.
        // Neste caso, ele está adicionando cada nova linha ao corpo da 
                // tabela, construindo a tabela linha por linha.

    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Registra um ouvinte de evento que aguarda até que todo o 
            // conteúdo do DOM (estrutura de documento HTML) esteja 
            // completamente carregado e pronto para ser manipulado.
    // 'DOMContentLoaded' é um evento que é disparado quando o 
            // documento HTML inicial (incluindo scripts, estilos, 
            // mas não necessariamente imagens etc.) foi completamente carregado.
    // Isso não espera por folhas de estilo, imagens e subframes 
            // terminarem de carregar.

    fetch('funcionarios.xlsx')
    // Chama a função 'fetch', que é usada para fazer uma solicitação 
            // de rede para um recurso, neste caso, o arquivo 
            // 'funcionarios.xlsx'.
    // 'fetch' retorna uma promessa que, quando resolvida, contém a 
            // resposta da solicitação de rede.

        .then(response => response.arrayBuffer())
        // O primeiro '.then' manipula a resposta do 'fetch'.
        // 'response.arrayBuffer()' é um método que lê a resposta e a 
                // retorna como um ArrayBuffer, um tipo de dado que 
                // representa um buffer de dados binários de tamanho fixo na memória.

        .then(data => {
            // O segundo '.then' recebe o ArrayBuffer (data) como argumento.
            // Esse ArrayBuffer contém os dados binários do arquivo Excel.

            var workbook = XLSX.read(data, { type: 'array' });
            // 'XLSX.read' é uma função da biblioteca SheetJS que lê os 
                    // dados binários do Excel e os converte em um objeto de 
                    // workbook (livro de trabalho) que pode ser manipulado 
                    // pelo JavaScript.
            // O parâmetro { type: 'array' } informa à função que os dados 
                    // estão no formato de um ArrayBuffer.

            var primeiraSheet = workbook.Sheets[workbook.SheetNames[0]];
            // Acessa a primeira planilha do workbook.
            // 'workbook.SheetNames' é uma propriedade que contém uma 
                    // lista dos nomes de todas as planilhas no workbook.
            // 'workbook.Sheets[nome]' retorna a planilha 
                    // correspondente ao nome fornecido.

            var dadosJSON = XLSX.utils.sheet_to_json(primeiraSheet);
            // Converte os dados da primeira planilha (primeiraSheet) em 
                    // um formato JSON (JavaScript Object Notation).
            // JSON é um formato que facilita a manipulação de dados em 
                    // JavaScript, transformando dados tabulares em 
                    // uma lista de objetos.

            carregarDados(dadosJSON);
            // Chama a função 'carregarDados' definida anteriormente 
                    // para adicionar os dados convertidos ao corpo 
                    // da tabela no HTML.

        })

        .catch(error => console.error('Erro ao carregar os dados:', error));
        // O método 'catch' é usado para capturar qualquer erro que 
                // ocorra durante a execução das promessas acima.
        // Se ocorrer um erro em qualquer ponto, desde a solicitação 
                // inicial até a conversão dos dados, ele será capturado 
                // aqui e um erro será logado no console.
                
});


function exportarParaExcel() {
    // Definição da função 'exportarParaExcel'. Esta função é 
            // chamada para exportar os dados da tabela HTML em 
            // formato de arquivo Excel (.xlsx).

    var tabela = document.getElementById("tabelaFuncionarios");
    // Acessa o elemento da tabela HTML com o ID 'tabelaFuncionarios'.
    // 'document.getElementById' é um método que retorna o 
            // elemento DOM (Document Object Model) que possui o 
            // ID especificado.
    // 'tabela' agora é uma referência ao elemento da tabela HTML 
            // que contém os dados dos funcionários.

    var workbook = XLSX.utils.table_to_book(tabela);
    // Converte a tabela HTML em um 'workbook' (livro de trabalho 
            // do Excel) usando a biblioteca XLSX.
    // 'XLSX.utils.table_to_book' é uma função da biblioteca SheetJS (XLSX) 
            // que toma um elemento de tabela HTML e o transforma em 
            // um formato que pode ser usado para gerar arquivos Excel.
    // 'workbook' é um objeto que representa o arquivo Excel, contendo 
            // todos os dados e formatações presentes na tabela HTML.

    XLSX.writeFile(workbook, 'funcionarios.xlsx');
    // Escreve o 'workbook' em um arquivo físico chamado 'funcionarios.xlsx'.
    // 'XLSX.writeFile' é uma função da biblioteca XLSX que cria um 
            // arquivo Excel real a partir do objeto 'workbook'.
    // O primeiro argumento é o objeto 'workbook' e o segundo 
            // argumento é o nome do arquivo que será criado e 
            // salvo no dispositivo do usuário.
    // Isso permite que o usuário baixe automaticamente o arquivo 
            // Excel com os dados da tabela.

}