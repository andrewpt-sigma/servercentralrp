var Aberto = false;
const Avatarherf = document.getElementById('avatar')

function DisplayUser(usere, avatarop) {
    const Butlogin = document.getElementById('butlogin')
    const Displayname = document.getElementById('nome')

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


fetch("/callserver/me", { credentials: "include" })
    .then(res => {
        if (!res.ok) throw new Error("não autenticado");
        return res.json();
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