document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('sorteador').addEventListener('submit', function(e){
        e.preventDefault();
        let nummax = document.getElementById('numeroMax').value;
        nummax = parseInt(nummax);
        let numaleatorio = Math.random() * nummax;
        numaleatorio = Math.floor(numaleatorio) + 1;
        document.getElementById('resultado-valor').innerHTML = numaleatorio;
        document.querySelector('.resultado').style.display = 'block';
    })
});