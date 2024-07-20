const { zokou } = require('../framework/zokou');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../bdd/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom : 'alive',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Hours(GMT)* : ${temps}

 ${message}
 
 
 *JOEL-MD-WABOT*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("𝑨𝑵𝑮𝑼𝑲𝑨 𝑵𝑨𝒀𝑶") ; return};

      await   repondre("*𝑨𝑵𝑮𝑼𝑲𝑨 𝑵𝑨𝒀𝑶 https://whatsapp.com/channel/0029Vajvy2kEwEjwAKP4SI0x");
         repondre("𝑲𝑰𝑵𝑮 𝑴𝑨𝑹𝑰𝑺𝑬𝑳:)")
     }
 } else {

    if(!superUser) { repondre ("𝑻𝑯𝑬 𝑲𝑰𝑵𝑮 𝑹𝑬𝑰𝑮𝑯𝑵𝑺") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre(' join ganz official channel to reject the finance bill and shit in Kenya🇿🇦 https://whatsapp.com/channel/0029Vade9VgD38CPEnxfYF0M🇿🇦. ')

}
    });
