module.exports.run = (client, message, args, server) => {
  const { MessageEmbed } = require("discord.js");

  if (args[0]) {
    const LowerCaseArgs = args[0].toLowerCase();
    const command = client.commands.get(LowerCaseArgs);

    if (!command) {
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Invalid Command")
          .setDescription(
            "Please try again, you have provided an invalid command!"
          )
          .setColor(15158332)
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setFooter(server.name + "  |  Invalid Command", server.iconURL())
      );
    } else {
      const PermissionLevel =
        client.config.PermissionLevels[command.config.PermissionLevel].Name;
      const CommandHelpEmbed = new MessageEmbed()
        .setTitle("Help")
        .setColor(3447003)
        .setDescription(
          "Here is all the information about the " +
            command.config.Name +
            " command!"
        )
        .addField("Name", command.config.Name, true)
        .addField("config.Category", command.config.Category, true)
        .addField("Description", command.config.Description, true)
        .addField("Aliases", command.config.Aliases.join(", "), true)
        .addField("Usage", command.config.Usage, true)
        .addField("Permission Level", PermissionLevel, true)
        .setFooter(
          server.name + "  |  Help  |  " + command.config.Name,
          server.iconURL()
        )
        .setThumbnail(server.iconURL());

      async function DMsend() {
        await message.author.send(CommandHelpEmbed);
        await message.reply("**check your DMs!**");
      }
      DMsend().catch(function () {
        message.channel.send(CommandHelpEmbed);
      });
    }
  } else {
    const HelpEmbed = new MessageEmbed()
      .setTitle("Help")
      .setColor(3447003)
      .setDescription(
        "If you would like to get to know more of a certain command, execute `" +
          client.config.Discord_Prefix +
          "help <command>`."
      )
      .setThumbnail(server.iconURL())
      .setFooter(
        server.name + "  |  Help  |  Total Commands: " + client.commands.size,
        server.iconURL()
      );

    const categories = client.commands
      .map((command) => command.config.Category)
      .filter((v, i, a) => a.indexOf(v) == i);
    categories.forEach((category) => {
      const commands = client.commands.filter(
        (command) => command.config.Category === category
      );
      HelpEmbed.addField(
        `❯ ${category} [${commands.size}]`,
        commands.map((command) => "`" + command.config.Name + "`").join(" ")
      );
    });

    async function DMsend() {
      await message.author.send(HelpEmbed);
      await message.reply("**check your DMs!**");
    }
    DMsend().catch(function () {
      message.channel.send(HelpEmbed);
    });
  }
};

module.exports.config = {
  Name: "help",
  Description: "A list of commands you can use with our bot.",
  Aliases: ["cmds", "commands"],
  Usage: "help <command> OR help",
  PermissionLevel: 0,
};
