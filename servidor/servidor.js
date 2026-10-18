import "dotenv/config";
import express from "express";
import session from "express-session";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import path from "path";
import pg from "pg";
import { WebhookClient, EmbedBuilder } from "discord.js";
const __dirname = import.meta.dirname;

import "dotenv/config";
import { Prisma, PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.INTERNAL_DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

const { Pool } = pg;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MASTERKEY = process.env.MASTER_KEY


const CARACTERES = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function gerarId() {
    const grupos = [];
    for (let g = 0; g < 4; g++) {
        let grupo = '';
        for (let i = 0; i < 4; i++) {
            grupo += CARACTERES[crypto.randomInt(CARACTERES.length)];
        }
        grupos.push(grupo);
    }
    return grupos.join('-'); 
}

const pool = new Pool({
    connectionString: process.env.INTERNAL_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const limtett = rateLimit({
    windowMs: 60*1000,
    max: 20,
    standardHeaders: true,
    message: { error: "Tentativa de ataque DDOS detectado."}
})

const apiwhitelist = rateLimit({
    windowMs: 10000*100000,
    max: 1,
    standardHeaders: true,
    message: { error: "So podes enviar 1 whitelist."}
})

import { Client, GatewayIntentBits, ActivityType } from "discord.js";

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
    console.log(`Ligado como ${client.user.tag}`);

    const atualizarPresenca = () => {
        client.user.setPresence({
            activities: [
                {
                    name: '📡 Analisando https://centralrp-b73q.onrender.com',
                    type: ActivityType.Listening
                }
            ],
            status: 'online'
        });
    };

    atualizarPresenca();

    setInterval(atualizarPresenca, 2000);
});



client.login(process.env.BOT_TOKEN);

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

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"))
})

app.get("/whitelist", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "whitelist.html"));
});

app.get("/politica-privacidade", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "privacidade.html"))
})

app.post("/whitelist/api/post", async (req, res) => {
    const { robloxid, email, IdadePlayer, NacionalidaePlayer, Mic, Pc, TempodeJogo, Amigos, NomePers, DataPers, SexoPers, MaePers, PaiPers, History, usernome, avatar} = req.body;

    if (!robloxid || !email || !IdadePlayer || !NacionalidaePlayer || !Mic || !Pc || !TempodeJogo || !Amigos || !NomePers || !DataPers || !SexoPers || !MaePers || !PaiPers || !History){
       return res.sendStatus(401)

    }
    const whitelistid = gerarId();


    const Webhoock = new WebhookClient({ url: process.env.WEBHOOCK_WHITELIST})

    try {
        const prisma = await prisma.whitelist.create({ data: { whitelistid, email, NomePers } });
        res.json(item);
    }
    catch (e) {

    }

    Webhoock.send({
          "embeds": [
    {
      "title": `Nova WhiteList | ${whitelistid}`,
      "description": `**Informações:**\n> Nome - ${usernome}\n> Email - ${email}\n> Roblox - ${robloxid}\n**Pessoal:**\n> Idade - ${IdadePlayer}\n> País - ${NacionalidaePlayer}\n> Microfone - ${Mic}\n> PC - ${Pc}\n> Tempo - ${TempodeJogo}\n> Amigos - ${Amigos}\n**Personagem:**\n> Nome - ${NomePers}\n> Data de nascimento - ${DataPers}\n> Sexo - ${SexoPers}\n> Nome da Mãe - ${MaePers}\n> Nome do Pai - ${PaiPers}\n> Historia  - ${History}`,
      "color": 4101631,
      "author": {
        "name": "Sistema de WhiteList"
      },
      "footer": {
        "text": `Versão do Sistema ${process.env.VERSAO}`,
        "icon_url": "https://media.discordapp.net/attachments/1442198504536670443/1559672368769671198/85336-typing.gif?ex=6acfed96&is=6ace9c16&hm=7401ab8f621bdb4f295ce14c2610f55595074a28499f35a3f9641f2621e3f29f&"
      },
      "thumbnail": {
        "url": `${avatar}`
      }
    }
  ],
    }).catch(console.error)

    console.log(robloxid, email, whitelistid)
    return res.status(201).json({
        id: whitelistid
    })
})


app.get("/gestor", limtett, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "gestor.html"));
});

app.get("/login", limtett)

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