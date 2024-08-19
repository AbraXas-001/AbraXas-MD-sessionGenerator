const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: RexEmperor,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = "AbraXas:" + makeid();
	async function Rex_Emperor_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Rex_Emperor = RexEmperor({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Rex_Emperor.ev.on('creds.update', saveCreds)
			Qr_Code_By_Rex_Emperor.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Rex_Emperor.sendMessage(Qr_Code_By_Rex_Emperor.user.id, { text: '' + b64data });
	
				   let AbraXas_MD_TEXT = `
*_Session Connected By AbraXas-MD_*
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
	 await Qr_Code_By_Rex_Emperor.sendMessage(Qr_Code_By_Rex_Emperor.user.id,{text: AbraXas_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Wasi_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Rex_Emperor_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Rex_Emperor_QR_CODE()
});
module.exports = router
