const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();
client.login(botConfig.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("Merealis Roleplay", { type: "PLAYING" });

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (command === `${prefix}Devtest`) {

        return message.channel.send("Bot staat aan en werkt!");

    }

    if (command === `${prefix}>.54infovacatures`) {
        // Embed wat we gaan laten tonen.
        var botEmbed = new discord.MessageEmbed()
            .setTitle('Vacatures Overheidsbanen.')
            .setDescription("Wil je je goede hard tonen en bij de overheid komen werken? Dan is dit je kans, Hieronder bevind zich per afdeling het sollicitatie formulier.")
            .addFields(
                { name: "Politie | Gesloten | Whitelisted", value: "*Sollicitatie formulier: Gesloten*" },
                { name: "Ambulance | Open | Whitelisted", value: "*Sollicitatie formulier: http://bit.ly/38JXfxs*" },
                { name: " Wegenwacht | Open | Whitelisted", value: "*Sollicitatie formulier: http://bit.ly/35MvyCd*" },
            )
            .setColor("#4886db")
            .setFooter("Gemaakt door DylanJ#2351 en Jayh#0530")
        // pol;http://bit.ly/39uqEL2
        // ambu; http://bit.ly/38JXfxs
        // ANWB; http://bit.ly/35MvyCd
        //


        // Terug sturen van het bericht
        return message.channel.send(botEmbed);
    }

    if (command === `${prefix}mijninfo`) {

        var serverEmbed = new discord.MessageEmbed()
            .setTitle("Jou informatie.")
            .setDescription("Hier vind je jou informatie terug.")
            .setColor("#4886db")
            .addField("Je bent deze server gejoind op", message.member.joinedAt)
            .setFooter("Gemaakt door DylanJ#2351 en Jayh#0530.")
            .setTimestamp()



        return message.channel.send(serverEmbed);
    }

    if (command === `${prefix}kick`) {

        const args = message.content.slice(prefix.length).split(/ +/);

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Error Code1: Jij hebt geen permissies.");

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("LET OP! De bot heeft hier geen permissie voor; DM DylanJ#2351.");

        if (!args[1]) return message.reply("Error Code2: Geen gebruiker meegegeven.");

        if (!args[2]) return message.reply("Error Code3: Geen redenen opgegeven.");

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reason = args.slice(2).join(" ");

        if (!kickUser) return message.reply("LET OP! De gebruiker is niet gevonden.");

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(kickUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
            **Gekickt door:** ${message.author}
            **Redenen: ** ${reason}`);

        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${kickUser} kicken?`);


        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


            // We kijken dat het de gebruiker is die het als eerste heeft uitgevoerd.
            // message.channel.awaitMessages(m => m.author.id == message.author.id,
            //     { max: 1, time: 30000 }).then(collected => {

            //         if (collected.first().content.toLowerCase() == 'yes') {
            //             message.reply('Kick speler.');
            //         }
            //         else
            //             message.reply('Geanuleerd');

            //     }).catch(() => {
            //         message.reply('Geen antwoord na 30 sec, geanuleerd.');
            //     });


            if (emoji === "✅") {

                msg.delete();

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });

                message.reply(embed);

            } else if (emoji === "❌") {

                msg.delete();

                message.reply("Kick geanuleerd").then(m => m.delete(5000));

            }

        });
    }


    if (command === `${prefix}ban`) {

        const args = message.content.slice(prefix.length).split(/ +/);

        if (!args[1]) return message.reply("Error Code2: Geen gebruiker meegegeven.");

        if (!args[2]) return message.reply("Error Code3: Geen redenen opgegeven.");

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Error Code1: Jij hebt geen permissies.");

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("LET OP! De bot heeft hier geen permissie voor; DM DylanJ#2351.");

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reason = args.slice(2).join(" ");

        if (!banUser) return message.reply("LET OP! De gebruiker is niet gevonden.");

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(banUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Geband:** ${banUser} (${banUser.id})
            **Geband door:** ${message.author}
            **Redenen: ** ${reason}`);

        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${banUser} bannen?`);


        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


            // We kijken dat het de gebruiker is die het als eerste heeft uitgevoerd.
            // message.channel.awaitMessages(m => m.author.id == message.author.id,
            //     { max: 1, time: 30000 }).then(collected => {

            //         if (collected.first().content.toLowerCase() == 'yes') {
            //             message.reply('Kick speler.');
            //         }
            //         else
            //             message.reply('Geanuleerd');

            //     }).catch(() => {
            //         message.reply('Geen antwoord na 30 sec, geanuleerd.');
            //     });


            if (emoji === "✅") {

                msg.delete();


                banUser.ban(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });

                message.reply(embed);

            } else if (emoji === "❌") {

                msg.delete();

                message.reply("Ban geanuleerd").then(m => m.delete(5000));

            }

        });
    }

    // Emojis aan teksten kopellen.
    async function promptMessage(message, author, time, reactions) {
        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;

        // We gaan ieder meegegeven reactie onder de reactie plaatsen.
        for (const reaction of reactions) {
            await message.react(reaction);
        }

        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
    }

    if (command === `${prefix}StatusAAN`) {

        var serverEmbed = new discord.MessageEmbed()
            .setTitle("Serverstatus:")
            .setDescription("Op dit moment staat de server aan, Je kan joinen via het IP: merealis.vibegames.pro")
            .setColor("#GREEN")
            .setFooter("Gemaakt door DylanJ#2351 en Jayh#0530.")
            .setTimestamp()


        return message.channel.send(serverEmbed);
    }

    if (command === `${prefix}StatusUIT`) {

        var serverEmbed = new discord.MessageEmbed()
            .setTitle("Serverstatus:")
            .setDescription("Op dit moment is de server niet toegankenlijk. dit komt omdat de server tijdenlijk uitstaat. Wij houden u op de hoogte.")
            .setColor("#GREEN")
            .setFooter("Gemaakt door DylanJ#2351 en Jayh#0530.")
            .setTimestamp()


        return message.channel.send(serverEmbed);
    }


    if (command === `${prefix}StatusSTORING`) {

    var serverEmbed = new discord.MessageEmbed()
        .setTitle("Serverstatus:")
        .setDescription("We moeten u helaas melden dat de server er even uit gaat door een sotring bij ons / de host. We proberen dit zo snel mogenlijk te verhelpen en houden u op de hoogte.")
        .setColor("#GREEN")
        .setFooter("Gemaakt door DylanJ#2351 en Jayh#0530.")
        .setTimestamp()


    return message.channel.send(serverEmbed);
}


if (command === `${prefix}StatusDEV`) {

    var serverEmbed = new discord.MessageEmbed()
        .setTitle("Serverstatus:")
        .setDescription("Op dit moment staat de server even uit, we zijn even bezich met te developen. We houden u op de hoogte.")
        .setColor("#GREEN")
        .setFooter("Gemaakt door DylanJ#2351 en Jayh#0530.")
        .setTimestamp()


    return message.channel.send(serverEmbed);

}



if (command === `${prefix}ping`) {
    message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);



}})

client.login(process.env.token);