const NotionClient = require('./api/api-notion');
const Bot = require('./bot/bot');

const bot = new Bot();
bot.init();

const notion = new NotionClient();

const pollDatabase = async () => {
    const pages = await notion.getDatabase();
    for (const page of pages) {
        // const message = await notion.formatPageMessage(page);
        return await notion.getDatabaseObjects(page);
        // await bot.sendMessage(message);
    }
};

setInterval(pollDatabase, 60000);