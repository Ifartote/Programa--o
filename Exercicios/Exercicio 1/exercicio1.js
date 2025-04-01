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
document.getElementById("texto").innerHTML = nomeCompleto;""