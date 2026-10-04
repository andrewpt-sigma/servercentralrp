let inputindex1 = 0

function inputnext(){
    const butanterior = document.getElementById('butanterior')
    const cont1inputs1 = document.getElementById('inputs1')
    const cont1inputs2 = document.getElementById('inputs2')
    const tittle = document.getElementById("h2")

    if (inputindex1 == 0){
        cont1inputs1.style = "display: flex;";
        inputindex1 += 1;
        butanterior.style.display = "none";
        tittle.textContent = 'Informações'
    }


    else if (inputindex1 == 1){
        tittle.textContent = 'Pessoal'
        cont1inputs2.style = "display: flex;";
        inputindex1 += 1;
        cont1inputs1.style = "display: none;"
        butanterior.style = "display: flex;";
    }
}

function inputanterior() {

    if (inputindex1 == 1){
        inputindex1--;
        console.log(inputindex1)
        inputnext()
    }


}

function iniciar(){
    const contstart = document.getElementById("start")
    const butiniciar = document.getElementById("butstart")
    butiniciar.style = "display: none;"
    contstart.style = "display: none;"
    inputnext()
}