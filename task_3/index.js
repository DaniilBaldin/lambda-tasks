process.env["NTBA_FIX_319"] = 1;
process.env["NTBA_FIX_350"] = 1;
const TOKEN = "5315830907:AAGwVXmQKVZR_wYDTrzxED5OzDIGOVFnLXI";
const telegramBot = require("node-telegram-bot-api");
const bot = new telegramBot(TOKEN, { polling: true });
const { program } = require("commander");

program
  .command("message")
  .alias("m")
  .description("Message to send to telegram Bot")
  .argument("string", "message to send")
  .action((message) => {
    bot.sendMessage(384138295, message);
    console.log("Message was successfully sent!");
  });

program
  .command("photo")
  .alias("p")
  .description(
    "Write correct path to photo or just drag and drop photo to console to send it to Telegram Bot"
  )
  .argument("path", "photo to send")
  .action((photo) => {
    bot.sendPhoto(384138295, photo);
    console.log("Photo was successfully sent!");
    process.exit(0);
  });

program.parse(process.argv);
