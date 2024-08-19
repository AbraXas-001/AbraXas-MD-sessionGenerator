const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Rex_Emperor,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("maher-zubair-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = "AbraXas:" + makeid();
    let num = req.query.number;
        async function PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Rex_Emperor = Rex_Emperor({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!Pair_Code_By_Rex_Emperor.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Rex_Emperor.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Rex_Emperor.ev.on('creds.update', saveCreds)
            Pair_Code_By_Rex_Emperor.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Rex_Emperor.sendMessage(Pair_Code_By_Rex_Emperor.user.id, { text: '' + b64data });

               let AbraXas_MD_TEXT = `
*_Pair Code Connected by AbraXas-MD_*
*STEP: 1*
    🎉 *Connection Successful!* 🎉

    Your WhatsApp session has been successfully established. ✔️

    🔑 *Session ID:* ${sessionID}

    Please keep this Session ID safe. You will need to input it into the Heroku environment variables (\`SESSION_ID\`) during deployment.

    📥 *Deploying Your Bot:*
    *STEP: 2*

    1. Visit your Heroku dashboard.
    2. Create a new Heroku app or navigate to an existing one.
    3. Go to the 'Settings' tab.
    4. Under 'Config Vars', add a new variable:
       - \`SESSION_ID\`: ${sessionID}
    5. Redeploy your app to use this session.

    ✨ You can now deploy your bot without needing to re-scan the QR code!

    👉 [Join our WhatsApp Group](https://chat.whatsapp.com/BvquURuMoF6FGaIVHIK6hR)   for updates, support, and more!
     Support? Message the developer: +2347043283600/+2348026733747

_Don't Forget To Give Star To My Repo_`
 await Pair_Code_By_Rex_Emperor.sendMessage(Pair_Code_By_Rex_Emperor.user.id,{text:GIFTED_MD_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Rex_Emperor.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await PAIR_CODE()
});
module.exports = router
