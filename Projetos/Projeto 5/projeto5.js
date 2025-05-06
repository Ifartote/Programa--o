document.addEventListener('DOMContentLoaded', function () {
    const vermelho = document.querySelector('.vermelho');
    const amarelo = document.querySelector('.amarelo');
    const verde = document.querySelector('.verde');

    let estadoAtual = 0;

    function alterarEstado(){
        vermelho.classList.remove('ativo');
        amarelo.classList.remove('ativo');
        verde.classList.remove('ativo');

        if(estadoAtual === 0){
            vermelho.classList.add('ativo');
        
        } else if (estadoAtual === 1){ 
            amarelo.classList.add('ativo');

        } else if (estadoAtual === 2){ 
            verde.classList.add('ativo');
    }
    estadoAtual = (estadoAtual + 1) % 3;
} 
  setInterval(alterarEstado, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
    const luzes = documentURI.querySelector('.semaforo div');
    luzes.forEach(luz => {
        luz.addEventListener('click', () => {
            luzes.forEach(l => l.classList.remove('ativo'));
            luz.classList.add('ativo');
        });
    });
});