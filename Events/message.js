module.exports = (client, message) => {
  const { MessageEmbed } = require("discord.js");
  const server = client.guilds.cache.get(client.config.Discord_GuildId);

  if (message.channel.type !== "text") {
    return;
  }

  if (
    !message.content.startsWith(client.config.Discord_Prefix) ||
    message.author.bot
  ) {
    return;
  }

  const args = message.content
    .slice(client.config.Discord_Prefix.length)
    .trim()
    .split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.config.Aliases && cmd.config.Aliases.includes(commandName)
    );

  if (!command) {
    return;
  }

  if (client.config.PermissionLevels[command.config.PermissionLevel]) {
    if (
      client.config.PermissionLevels[command.config.PermissionLevel].Type ==
      "RoleName"
    ) {
      if (
        !message.member.roles.cache.some((r) =>
          client.config.PermissionLevels[command.config.PermissionLevel][
            "Role(s)"
          ].includes(r.name)
        )
      ) {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(15158332)
            .setTitle("Invalid Permissions")
            .setDescription(
              ":x: You do not have permission to use this command!"
            )
            .addField(
              "Required Permission(s)",
              "Role(s): " +
                client.config.PermissionLevels[command.config.PermissionLevel][
                  "Role(s)"
                ].join(", ")
            )
            .setFooter(
              server.name + "  |  Invalid Permissions",
              server.iconURL()
            )
        );
      }
    }
    if (
      client.config.PermissionLevels[command.config.PermissionLevel].Type ==
      "UserId"
    ) {
      if (
        message.author.id !==
        client.config.PermissionLevels[command.config.PermissionLevel].UserId
      ) {
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(15158332)
            .setTitle("Invalid Permissions")
            .setDescription(
              ":x: You do not have permission to use this command!"
            )
            .addField(
              "Required Permission(s)",
              "User ID: " +
                client.config.PermissionLevels[command.config.PermissionLevel]
                  .UserId
            )
            .setFooter(
              server.name + "  |  Invalid Permissions",
              server.iconURL()
            )
        );
      }
    }
  }

  try {
    command.run(client, message, args, server);
  } catch (err) {
    console.log(
      `An error has occured with the ${command.config.Name} command. This error occured while the Discord user ${message.author.tag}(${message.author.id}) was trying to execute the command ${command.config.Name}! This error has occured in the guild ${message.guild.name}(${message.guild.id}). The error is: ${err.stack}`
    );
    console.log(" - - - - - - - - - - - - - - - - - - - - -");
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor(15158332)
        .setDescription(
          "An error has occured, the developer has been notified!"
        )
        .setFooter(server.name + "  |  Error", server.iconURL())
    );
  }
};
