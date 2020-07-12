const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config();
const Client = require("./Client");
const client = new Client();

const folders = fs
  .readdirSync("./commands")
  .filter((file) => fs.statSync(path.join("./commands", file)).isDirectory());
for (const folder of folders) {
  const CommandFiles = fs
    .readdirSync(path.resolve(`./commands/${folder}`))
    .filter(
      (file) =>
        !fs.statSync(path.resolve("./commands/", folder, file)).isDirectory()
    )
    .filter((file) => file.endsWith(".js"));
  for (let file of CommandFiles) {
    file = require(`./commands/${folder}/${file}`);
    file.config.Category = folder;
    client.commands.set(file.config.Name, file);
  }
}

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    const EventName = file.split(".")[0];
    client.on(EventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

async function login() {
  await client.login(process.env.Discord_Token).catch(function (err) {
    console.log(
      `An error has occured while connecting to Discord. The error is: ${err}`
    );
    console.log(" - - - - - - - - - - - - - - - - - - - - -");
  });
}

login('NzMxNTk2MjMwMTY5NDYwNzU3.Xws-pw.XP6gdbgQmHn4fsekniTRawzy-rc');
