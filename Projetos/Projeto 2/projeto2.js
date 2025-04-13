document.getElementById('mudarCor').addEventListener('click', function(){
    const corAleatoria = Math.floor(Math.random() * 16777215) .toString(16);

    document.body.style.background = "#" + corAleatoria;

});