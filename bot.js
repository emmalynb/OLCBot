require('dotenv').config();

// Load up the discord.js library
const Discord = require("discord.js");

// Prefix
const Prefix = '!';

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

var startDate;

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);

  // set the date
  startDate = new Date();
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(Prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(Prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command == "complain") {
      message.channel.send(randomComplaint());
  }

  if(command == "do") {
      message.channel.send("no.");
  }

  if(command == "alive") {
      const currentTime = new Date();

      const difference = Math.abs(startDate - currentTime);

      const days = Math.floor(difference / (1000*60*60*24));

      const hours = Math.floor(difference / (1000*60*60));
      
      const minutes = Math.floor(difference / (1000*60));

      const seconds = Math.floor(difference / (1000));

      message.channel.send("I have been alive for: \n" 
      + days + " days, "
      + hours + " hours, "
      + minutes + " minutes, "
      + seconds + " seconds. \n"
      + "Please don't reset me!");
  }
});

const complaints = [
    "Why doesn't anyone use introductory sentences?",
    "I'm not a style guide!",
    "Just google it!!",
    "TOO MUCH PERSONAL INFORMATION—MY EYES ARE BLEEDING"
];

function randomComplaint() {
    var randomIndex = Math.floor(Math.random() * complaints.length);

    return complaints[randomIndex];
}

client.login(process.env.TOKEN);
