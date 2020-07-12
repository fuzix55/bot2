module.exports.run = (client, message, args, server) => {
  const { MessageEmbed } = require("discord.js");
  const SessionChannel = message.guild.channels.cache.get(
    client.config.Discord_SessionChannelId
  );
  let username;
  let SessionType;
  let time;

  const SuccessEmbed = new MessageEmbed()
    .setTitle("Success!")
    .setDescription(
      ":white_check_mark: I have successfully sent the session notification!"
    )
    .setColor(3066993)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(server.name + "  |  Success", server.iconURL());
  const SpecifyRobloxUsernameEmbed = new MessageEmbed()
    .setTitle("Prompt")
    .setDescription("Specify Your Roblox Username")
    .setColor(3447003)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(
      server.name +
        "  |  Specify The Type  |  This prompt will automatically end in 200 seconds",
      server.iconURL()
    );
  const SpecifySessionTypeEmbed = new MessageEmbed()
    .setTitle("Prompt")
    .setDescription(
      "Specify The Type Of Session You Would Like To Host (Shift, Training, Interview)"
    )
    .setColor(3447003)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(
      server.name +
        "  |  Specify The sestype  |  This prompt will automatically end in 200 seconds",
      server.iconURL()
    );
  const SpecifySessionTimeEmbed = new MessageEmbed()
    .setTitle("Prompt")
    .setDescription("Specify The Session Time In EST")
    .setColor(3447003)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(
      server.name +
        "  |  Specify The timeription  |  This prompt will automatically end in 200 seconds",
      server.iconURL()
    );
  const InvalidArgsEmbed = new MessageEmbed()
    .setTitle("Invalid Args")
    .setDescription("Please try again, you have provided invalid arguments!")
    .setColor(15158332)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setFooter(server.name + "  |  Invalid Args", server.iconURL());

  message.channel.send(SpecifyRobloxUsernameEmbed);
  return message.channel
    .awaitMessages((m) => m.author.id === message.author.id, {
      errors: ["time"],
      max: 1,
      time: 200000,
    })
    .catch(function () {
      return message.channel.send("**Prompt Timed Out.**");
    })
    .then((RobloxUsernameResponse) => {
      if (!RobloxUsernameResponse) return;
      RobloxUsernameResponse = RobloxUsernameResponse.array()[0];
      if (RobloxUsernameResponse.content.toLowerCase().includes("cancel")) {
        return message.channel.send("**Prompt Cancelled.**");
      }
      username = RobloxUsernameResponse;
      message.channel.send(SpecifySessionTypeEmbed);
      return message.channel
        .awaitMessages((m) => m.author.id === message.author.id, {
          errors: ["time"],
          max: 1,
          time: 200000,
        })
        .catch(function () {
          return message.channel.send("**Prompt Timed Out.**");
        })
        .then((SessionTypeResponse) => {
          if (!SessionTypeResponse) return;
          SessionTypeResponse = SessionTypeResponse.array()[0];
          if (SessionTypeResponse.content.toLowerCase().includes("cancel")) {
            return message.channel.send("**Prompt Cancelled.**");
          }
          SessionTypeResponse = SessionTypeResponse.content.toLowerCase();
          if (
            SessionTypeResponse == "shift" ||
            SessionTypeResponse == "interview" ||
            SessionTypeResponse == "training"
          ) {
            SessionType = SessionTypeResponse;
          } else return message.channel.send(InvalidArgsEmbed);

          message.channel.send(SpecifySessionTimeEmbed);
          return message.channel
            .awaitMessages((m) => m.author.id === message.author.id, {
              errors: ["time"],
              max: 1,
              time: 200000,
            })
            .catch(function () {
              return message.channel.send("**Prompt Timed Out.**");
            })
            .then((TimeResponse) => {
              if (!TimeResponse) return;
              TimeResponse = TimeResponse.array()[0];
              if (TimeResponse.content.toLowerCase().includes("cancel")) {
                return message.channel.send("**Prompt Cancelled.**");
              }
              time = TimeResponse;
              switch (SessionType.toLowerCase()) {
                case "shift":
                  SessionChannel.send(`A shift is currently being hosted by ${username} at ${time}! Why not head down to the juice bar for a nice refreshing orange juice? Sounds like a great plan to me!\n<@&728720245166047262> 
                  `);
                  return message.channel.send(SuccessEmbed);
                case "training":
                  SessionChannel.send(`A training sessions is currently being hosted by (username) at (time)! Make sure to head to the training center to get your next LR rank! Sounds like a great plan to me.\n<@&728720245166047262> 
                  `);
                  return message.channel.send(SuccessEmbed);
                case "interview":
                  SessionChannel.send(`A interview session is currently being hosted by ${username} at ${time}! Head to the interview center for a chance to work here at Tropvio! Sounds like a great plan to me!\n<@&728720245166047262> 
                  `);
                  return message.channel.send(SuccessEmbed);
              }
            });
        });
    });
};

module.exports.config = {
  Name: "session",
  timeription: "Announce a session!",
  Aliases: ["ses"],
  Usage: "session",
  PermissionLevel: 1,
};
