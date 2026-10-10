const mainid = document.getElementById('main')
const headerid = document.getElementById('headeer')
const loadingid = document.getElementById('loading')

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

function DisplayUser(user) {
    document.getElementById('butlogin').style.display = 'none'
    Avatarherf.style.display = 'flex'
    Avatarherf.src = user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : 'assets/css/img/0.png'
    Displayname.textContent = user.username
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


async function enviardados(robloxid, email) {

    try{
        const res = await fetch('https://centralrp-b73q.onrender.com/whitelist/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',            
            },
            body: JSON.stringify({ robloxid, email }),
        });

        if (!res.ok) {
            throw new Error(`Erro ${res.status}`);
        }

        const  statusserver = await res.status();
        console.log(statusserver)

    }

    catch (error){
        console.error(error)
    }
    
}


fetch("/callserver/me", { credentials: "include" })
    .then(res => {
        if (!res.ok) {
            window.location.href = "/login"
            throw new Error("não autenticado")
        }
        mainid.style = 'display: flex;'
        headerid.style = 'display: flex;'
        loadingid.style = 'display: none;'
        return res.json()
    })
    .then(user => {
        if (user.avatar == null) {
            Avatarherf.src = 'assets/css/img/0.png'
            DisplayUser(user)
        } else {
            Avatarherf.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
            DisplayUser(user)
        }
    })
    .catch(() => {})