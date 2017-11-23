import TelegramBot from 'node-telegram-bot-api';
import config from './config';

const bot = new TelegramBot(config.TOKEN, { polling: true });

bot.on('message', msg => {
    const chatId = msg.chat.id;
    console.log(`[${msg.message_id}] ` + JSON.stringify(msg));
});

export default bot;