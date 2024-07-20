const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUI0alVVQ0xLSXE2MjNrVkhEMlRYdmMyemQ4SEY1ZlVNQ2R4Q1VsRFBWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYTE4MlBuQThscDFzZDhSeGpoTHpJclVMcXgySFo4eG1YNndzOU9iRituST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQzhkK053QXNTSVd1bkUvM0dtL1RkdW9teHZ5WjFCbDZ4d056WHZ3clVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjNHc0TXVxWUpKcFpkMnFMNjJJNGhTTzQwOUdDa1o2ZnBnVTA3YXR5aENrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LSEdBSWM3UlhmUTZTZk1HbytzMWpIdFhtckU2ZmZDYlo2cEdoQ3R1WEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IloxNDY0VXpUU3Q3K3ZJMG9oR3hDSTMvVXZMWUFkS2FXNElWVCtMdngvams9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUloOTlOeDdsdFo1aHpIQWQ5ZWR6N2tMZEZ0ak9RQmJwRW95bjhTK2puYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicS9YVzFqMWZyKys5ZTVURVE5d2ZwS2xQc05NUTh5UHl4UElXcWh1eitVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRxY0N3TVJyVzZIUVJDU3VEK0dMNGlxZ1V0SFAwRHpYZXIwcHQ4UGw1ZUxwWWx5MzZuMXMwV3kwYVVxN1YwaVgxR1N0TlBpNHBNbTMweDBMT1I4emlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiJHVmsyMmd2cytqWUtqSjFUT011blN3dVRlbkQ1SVg0TTJsVEo1Wngvc1R3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzOExnQWlWc1FUeWIyQWdTUGsyQ09BIiwicGhvbmVJZCI6IjllNjhjNDEyLWYwMjctNDUyNS05Y2JiLTM4M2JjYjE3NWYyZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSVlBWXRzRGd5SEtTcGd5NXFiUXI0L2E5eHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieElZM1VnRXI0NGhEaUw5TjAyY1Avb1M4eEEwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktFUUE3VldOIiwibWUiOnsiaWQiOiIyNjM3MTc3NjAwNTk6MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVhVOHVvR0VJaTI3clFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoibjg1RGlWRDgxaHZIWHUxY1cyYWIzblRzZVcxcEx1TkNrbHk2bkFyWURCZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiU2kzdHU1WFQrdVFqMjAyaWxFVndaUmw5bnhYY0N0R0ZQZC9yV3RiWG4zTnV4bTRHNXRVN3paL2RGZ2FjZkk0RkRGcXJ4b0h1MDEvTmd1NHN5Ny9aQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IldvcUlDcm95ME5rQk9BSzltRVMrRlpYUkxpbjJIbkErSE9IWTc3NTlzVmhFbXBpVTBpK0JYOXBqZ1N4V29EdWdMYWhpNGJZTDExcGh6SWlsTDV3eGl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE3NzYwMDU5OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWi9PUTRsUS9OWWJ4MTd0WEZ0bW05NTA3SGx0YVM3alFwSmN1cHdLMkF3WSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTQ3MzgxM30=',
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
