let inputindex1 = 0

function inputnext() {
    const butanterior = document.getElementById('butanterior')
    const cont1inputs1 = document.getElementById('inputs1')
    const cont1inputs2 = document.getElementById('inputs2')
    const cont1inputs3 = document.getElementById('inputs3')
    const tittle = document.getElementById("h2")

    if (inputindex1 === 0) {
        cont1inputs1.style.display = "flex"
        butanterior.style.display = "none"
        tittle.textContent = 'Informações'
        inputindex1 = 1
    } else if (inputindex1 === 1) {
        cont1inputs1.style.display = "none"
        cont1inputs2.style.display = "flex"
        butanterior.style.display = "flex"
        tittle.textContent = 'Pessoal'
        inputindex1 = 2
    } else if (inputindex1 === 2) {
        cont1inputs1.style.display = "none"
        cont1inputs2.style.display = "none"
        cont1inputs3.style.display = "flex"
        butanterior.style.display = "flex"
        tittle.textContent = 'Personagem'
        inputindex1 = 3
    } 

    
}

function inputanterior() {
    const butanterior = document.getElementById('butanterior')
    const cont1inputs1 = document.getElementById('inputs1')
    const cont1inputs2 = document.getElementById('inputs2')
    const cont1inputs3 = document.getElementById('inputs3')
    const tittle = document.getElementById("h2")

    if (inputindex1 === 2) {
        cont1inputs2.style.display = "none"
        cont1inputs1.style.display = "flex"
        butanterior.style.display = "none"
        tittle.textContent = 'Informações'
        inputindex1 = 1
    } else if (inputindex1 === 3) {
        cont1inputs2.style.display = "flex"
        cont1inputs1.style.display = "none"
        cont1inputs3.style.display = "none"
        tittle.textContent = 'Pessoal'
        inputindex1 = 2
    }
}

function iniciar(){
    const contstart = document.getElementById("start")
    const butiniciar = document.getElementById("butstart")
    butiniciar.style = "display: none;"
    contstart.style = "display: none;"
    inputnext()
}