const discord = require("discord.js");

class Client extends discord.Client {
  constructor(options) {
    super(options);

    this.config = require("./config");
    this.packages = require("./package");
    this.discord = discord;
    this.noblox = require("noblox.js");
    this.commands = new discord.Collection();
  }
}

module.exports = Client;
