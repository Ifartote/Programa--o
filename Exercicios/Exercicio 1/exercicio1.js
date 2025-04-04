//document.getElementById("texto").innerHTML="Meu Primeiro texto <b>JS</b>!";
//console.log("Oi, isso é um Console.log");
//console.log(" 5+5"); Quando o numero estiver entre aspas duplas ele entende como um texto, sem as aspas ele entende como um numero.

//Utilizando a Variavel Var.
//var a=1;
//var b=5;
//var c= a + b;
// console.log(c);

//Aqui a gente escreve a Variavel Var
var nome, sobrenome, nomeCompleto;
//Aqui a gente mostra o que cada elemento acima vai ser
nome= "Igor";
sobrenome= "Fartote";
nomeCompleto= nome + " "+ sobrenome;
//Com essa tag que definimos em HTML "TEXTO" vai ser o q vai no site.
//document.getElementById("texto").innerHTML = nomeCompleto;""

var valor1, valor2, total;
valor1 = "Igor ";
valor2= "Fartote";
total= valor1 + valor2;

//Com essa VAR podemos conseguimos dizer se é Verdadeiro ou Falso de acordo com os as caracteristicas descritas nas variaveis. 
var valor1, valor2, total;
valor1 = 10;
valor2 = 10;
total = (valor1 == valor2);
//alert(total);
// utilizando 3 sinais de igual = ele vai identificar se os itens são iguais e se é igual o tipo(numero ou texto).
// Se utilizarmos( != ) o sinal ! significa diferente.
// podemos utilizar os simbolos < > para perguntar se o valor é maior ou menos ent caso o VAR seja ( valor1 < 4) está perguntando se
// o valor 1 é menor q 4. Podemos utilizar <= ou >=.

var idade, eleitor;
idade = 25;
eleitor = (idade < 18) ? "Não, Eleitor" : "Sim, eleitor";
//alert('A Resposta é:'+ eleitor + ' a idade dele é de: ' + idade);

// a tag && significa E
var idade, eleitor, resultado;
idade = 61;
resultado = (idade > 60 && idade < 70); 
//alert(resultado)
// a tag || significa OU.
// exemplo (idade === 65 || idade === 72) significa q a idade é = a 65 ou 72.
//negação fora da equação, se colocarmos ! significa não ent 1=!( idade ===65) significa q a idade não é igual a 65.

