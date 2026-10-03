require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const session = require("express-session");

const APIKEY = process.env.API_KEY

app.use(
    session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, 
        },
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/loja", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/whitelist", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "whitelist.html"));
});

app.get("/gestor", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "gestor.html"));
});

app.get("/auth/discord/callback", async (req, res) => {
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

app.get("/callserver/me", (req, res) => {
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

app.get('/test', (req, res) => {
    if (req.headers.key == APIKEY){
        res.send('AUTORIZADO')
        console.log('autorizado')
    }
    else {
        res.send('NAO AUTORIZADOR!')
    }
})



app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, "public", "pagina404.html")
    );
});

app.listen(process.env.PORT || 3000, '0.0.0.0');
