const Eris = require("eris");
const token = require("./token.json")

const bot = new Eris(token.token);
bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    var keyword = "!"
    var voicecommand = "play";

    if(msg.content.startsWith(keyword + voicecommand)) { // If the message content starts with "!play "
        if(msg.content.length <= keyword.length + voicecommand.length + 1) { // Check if a filename was specified
            bot.createMessage(msg.channel.id, "Please specify a filename.");
            return;
        }
        if(!msg.channel.guild) { // Check if the message was sent in a guild
            bot.createMessage(msg.channel.id, "This command can only be run in a server.");
            return;
        }
        if(!msg.member.voiceState.channelID) { // Check if the user is in a voice channel
            bot.createMessage(msg.channel.id, "You are not in a voice channel.");
            return;
        }
        const filename = msg.content.substring(keyword.length + voicecommand.length + 1); // Get the filename
        bot.joinVoiceChannel(msg.member.voiceState.channelID).catch((err) => { // Join the user's voice channel
            bot.createMessage(msg.channel.id, "Error joining voice channel: " + err.message); // Notify the user if there is an error
            console.log(err); // Log the error
        }).then((connection) => {
            if(connection.playing) { // Stop playing if the connection is playing something
                connection.stopPlaying();
            }
            connection.play(filename); // Play the file and notify the user
            bot.createMessage(msg.channel.id, `Now playing **${filename}**`);
            connection.once("end", () => {
                bot.createMessage(msg.channel.id, `Finished **${filename}**`); // Say when the file has finished playing
            });
        });
    }

    if (msg.content.toLowerCase() === keyword + "ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    }
    switch (msg.content.toLowerCase()){
        case keyword + "ping":
            bot.createMessage(msg.channel.id, "Pong!");
            break;
        case keyword + "pong":
            bot.createMessage(msg.channel.id, "Ping!");
            break;
        case keyword + "avatar":
            bot.createMessage(msg.channel.id, msg.author.avatarURL);
            break;
    }
});
bot.connect();
