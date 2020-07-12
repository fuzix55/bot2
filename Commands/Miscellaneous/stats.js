module.exports.run = (client, message, args, server) => {
  function convertToMS(milliseconds) {
    let day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds,
    };
  }

  const uptime = convertToMS(client.uptime);
  const { MessageEmbed } = require("discord.js");
  const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

  function ReturnDependencies() {
    let dependencies = "";
    for (dependency in client.packages.dependencies) {
      dependencies = `${dependencies}\n${dependency} v${client.packages.dependencies[dependency]}`.replace(
        "^",
        ""
      );
    }
    return dependencies;
  }

  message.channel.send(
    new MessageEmbed()
      .setTitle("Statistics")
      .setColor(3447003)
      .setDescription("Here are my statistics!")
      .addField("Creator", "<@608782754448146452>", true)
      .addField("Servers", client.guilds.cache.size, true)
      .addField("Users", client.users.cache.size, true)
      .addField(
        "Uptime",
        uptime.day +
          "d " +
          uptime.hour +
          "h " +
          uptime.minute +
          "m " +
          uptime.seconds +
          "s",
        true
      )
      .addField("Engine", "Node.js " + process.version, true)
      .addField("Dependencies", ReturnDependencies(), true)
      .addField(
        "Memory Usage",
        `${Math.round(memoryUsage * 100) / 100} MB`,
        true
      )
      .setFooter(
        client.user.username + "  |  Statistics",
        client.user.displayAvatarURL()
      )
  );
};

module.exports.config = {
  Name: "stats",
  Description: "Show's the statistics of the bot!",
  Aliases: ["statistics"],
  Usage: "stats",
  PermissionLevel: 0,
};
