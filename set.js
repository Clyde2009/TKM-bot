const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0ZUbkZvSEhLT25Nb3JwUnRJZUtsZWp1Vm9xcitzai9QRGRud2lYellGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzhtVXhhZ1VacStuSHp5UlV2cnBTQ05qQ3RFM2w1M2JkQUk1M3YyMXBVYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQ3lJejhDOU1HTDk2NmdGT2FIbEN1UG5BUFRCTGJTYVk0V29rZ0lCbFZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvUjY2Myt1TXJtYXNoZmFZY1NITk4rc3EwZlNxQ1ptbURkcHd6T0diWWdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNEc3FJS3RVZjRwT09lMUcrQVV6V3lmRjdITmxsTGRpUHdtUkdnUUZ3RjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdTdnlvU1lqSmkrTmMxL2Vmcnh4dW1ndjJaOXdYUEZFVzdtYXBCdEtoblk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUJvQmJ5dU1CbysvTDZhQVZ4bVdOdmY3Sms0UlVrbkJieFNtcGl2eXkzaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMzBOamc0OXFKb0ZPN0xtM3VoUGxJeVJmMUhsN05HczAxcExPcGlpak1qQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndmVlVyd2FpOXRqUGVHSUUxMEFHdFpiU1BTUldLVHNzRk54NHdIb0Q0K2xEZmovY2liV1BOVmJYQVNlY0p0b3k4MkJDbzVmYUg0aUpadFhBQitTYkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEwLCJhZHZTZWNyZXRLZXkiOiI3SS9YWHlGaE82UG9tOEgwMGVlektPVno1K1h0UndySG1hSGxmSVhWMGVnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYbzlTNEhxVFNNR0N5c3BiUnAxOVFBIiwicGhvbmVJZCI6IjM4ODg3MzljLTdiYjAtNGYwNi04ZjM2LTlkMmI2NGYyMGU4MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUGkzZ1UzRVF0MElWWlVZUVBPakl6OEFKVUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWIzTU1jZk5WSXJaV1lDNW9uVWlNRFhsWVI4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ijg2OVIyWkI0IiwibWUiOnsiaWQiOiIyNjM3MTc3NjAwNTk6M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWJVOHVvR0VOS1I3N1FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoibjg1RGlWRDgxaHZIWHUxY1cyYWIzblRzZVcxcEx1TkNrbHk2bkFyWURCZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieEVncWN6d0hFMGFweWF2SmtIQVFUOVJmbzdCSTJLTUlzNlo2ZUFpeWVyUVM2NHZEOTVDUm5MYjhZOU5wNjdldlNNaDI3SnUza1hLaENvaGdZRmVTQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ik8rY09oMXl3SVZCdFlqR0xxeTAyRE9wUXhuYmd1OFVSV2puV3BBY1crOGN5ak1JS3FMQ08zRGFROGtxRWRFTHc5dXVxc0VGZWVGQm5WbHR2dW5VQ0J3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE3NzYwMDU5OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWi9PUTRsUS9OWWJ4MTd0WEZ0bW05NTA3SGx0YVM3alFwSmN1cHdLMkF3WSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTQ4NTUzNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOWkkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
