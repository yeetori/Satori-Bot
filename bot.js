const Eris = require("eris");
const token = require("./token.json")

const bot = new Eris(token.token);
bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    var keyword = "!"

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
        /*case keyword + "avatar":
            bot.createMessage(msg.channel.id, user.id.avatarURL)
            break;*/
    }
});
bot.connect();
