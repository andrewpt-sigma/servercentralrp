

let inputindex1 = 0

function inputnext() {
    const butanterior = document.getElementById('butanterior')
    const cont1inputs1 = document.getElementById('inputs1')
    const cont1inputs2 = document.getElementById('inputs2')
    const cont1inputs3 = document.getElementById('inputs3')
    const tittle = document.getElementById("h2")

    if (inputindex1 === 0) {
        cont1inputs1.style.display = "flex"
        cont1inputs2.style.display = "none"
        cont1inputs3.style.display = "none"
        butanterior.style.display = "none"
        tittle.textContent = 'Informações'
        inputindex1 = 1
    } else if (inputindex1 === 1) {
        cont1inputs1.style.display = "none"
        cont1inputs2.style.display = "flex"
        cont1inputs3.style.display = "none"
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
        cont1inputs1.style.display = "flex"
        cont1inputs2.style.display = "none"
        cont1inputs3.style.display = "none"
        butanterior.style.display = "none"
        tittle.textContent = 'Informações'
        inputindex1 = 1
    } else if (inputindex1 === 3) {
        cont1inputs1.style.display = "none"
        cont1inputs2.style.display = "flex"
        cont1inputs3.style.display = "none"
        butanterior.style.display = "flex"
        tittle.textContent = 'Pessoal'
        inputindex1 = 2
    }
}

function iniciar() {
    const contstart = document.getElementById("start")
    const butiniciar = document.getElementById("butstart")
    butiniciar.style = "display: none;"
    contstart.style = "display: none;"
    inputnext()
}

const Displayname = document.getElementById('nomee')

var Aberto = false;
const Avatarherf = document.getElementById('avatar')

function DisplayUser(usere, avatarop) {
    const Butlogin = document.getElementById('butlogin')

    Butlogin.style = 'display: none;'
    Avatarherf.style = 'display: flex;'
    Avatarherf.src = `https://cdn.discordapp.com/avatars/${usere.id}/${usere.avatar}.png`;
    Displayname.textContent = usere.username

}

function Abrirmenu() {
    const Menu = document.getElementById('menuser')

    if (Aberto == false) {
        Menu.style = 'display: flex;'
        Aberto = true;
    }
    else {
        Menu.style = 'display: none;'
        Aberto = false;
    }

}

function enviar(){
   const InputIDRoblox = document.getElementById('inputroblox').value
   const InpoutEmail = document.getElementById('inputemail').value

   enviardados(InputIDRoblox, InpoutEmail)
}


async function enviardados(Roblox, Email) {

    const dados = { Roblox, Email }

    try{
        const reposta = await fetch('https://centralrp-b73q.onrender.com/whitelist/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',            
            },
            body: JSON.stringify(dados),
        });

    }

    catch (error){
        console.error(error)
    }
    
}


fetch("/callserver/me", { credentials: "include" })
    .then(res => {
        if (!res.ok) 
            throw new Error("não autenticado");
            return res.json();
            const enviar = window.location.href = "/login"
        
    })
    .then(user => {

        if (user.avatar == null) {
            Avatarherf.src = 'assets/css/img/0.png';
            DisplayUser(user)
        }
        else {
            Avatarherf.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            DisplayUser(user)
        }

    })
    .catch(() => {

    });