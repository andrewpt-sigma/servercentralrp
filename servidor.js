require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const session = require("express-session");

const rateLimit = require("express-rate-limit");

const APIKEY = process.env.API_KEY
const MASTERKEY = process.env.MASTER_KEY

const limtett = rateLimit({
    windowMs: 60*1000,
    max: 20,
    standardHeaders: true,
    message: { error: "Calma bro..."}
})

app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/loja", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/whitelist", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "whitelist.html"));
});

app.get("/politica-privacidade", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "privacidade.html"))
})

app.post("/whitelist/post/form", limtett, (req, res) => {
    const { test1, test2 } = req.body;

    if (!test1 || !test2){
       return res.sendStatus(401)
    }

    return res.sendStatus(201).send("sucesso")
})


app.get("/gestor", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "gestor.html"));
});

app.get("/auth/discord/callback", limtett, async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send("pedido invalido");
    }

    try {
        const tokenDiscord = await fetch(
            "https://discord.com/api/oauth2/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: process.env.DISCORD_CLIENT_ID,
                    client_secret: process.env.DISCORD_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: process.env.DISCORD_REDIRECT_URI,
                }),
            }
            
        );

        if (!tokenDiscord.ok) {
            const errorData = await tokenDiscord.text();

            console.error("Discord respondeu:", tokenDiscord.status);
            console.error("Detalhes:", errorData);

            throw new Error("falha na troca de token");
        }

        const tokenData = await tokenDiscord.json();

        const userRes = await fetch(
            "https://discord.com/api/users/@me",
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );

        if (!userRes.ok) {
            throw new Error("falha ao obter utilizador do Discord");
        }

        const discordUser = await userRes.json();

        req.session.discordUser = {
            id: discordUser.id,
            username: discordUser.username,
            avatar: discordUser.avatar,
        };


        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("erro ao comunicar com a API do Discord");
    }


});

app.get("/callserver/me", limtett, (req, res) => {
    if (!req.session.discordUser) {
        return res.status(401).json({ error: "não autenticado" });
    }
    res.json(req.session.discordUser);
});

app.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.get('/status', limtett, (req, res) => {
    if (req.headers.key == MASTERKEY){
        console.log('Bot Resquest')
        return res.json({
            porta: process.env.PORT,
            whitelist: "0",
            callbackdc: process.env.DISCORD_REDIRECT_URI,
            botstatus: "Online",
            version: process.env.VERSAO

        })
    }
    else {
        res.status(401).send('Autenticação incorreta.')
    }
})



app.get("/bot/autoriztion/ticket", limtett, (req, res) => {
    const key = req.headers.key

    if (!MASTERKEY || !key || key !== MASTERKEY) {
        return res.sendStatus(401)
    }

    return res.sendStatus(200)
})


app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, "public", "pagina404.html")
    );
});

app.listen(process.env.PORT || 3000, '0.0.0.0'); 