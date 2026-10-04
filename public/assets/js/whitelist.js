const inputindex1 = 0

function inputnext(){
    const butanterior = document.getElementById('butanterior')
    const cont1inputs1 = document.getElementById('inputs1')
    const cont1inputs2 = document.getElementById('inputs2')

    if (inputindex1 == 0){
        cont1inputs1.style = "display: flex;"
        inputindex1 = +1
    }

    if (inputindex1 == 1){
        cont1inputs2.style = "display: flex;"
        inputindex1 = +1
        butanterior.style = "display: flex;"
    }
}

function inputanterior(){
    inputindex1 = -1
    inputnext()
}