import bot from '../bot';
import helpText from './help';

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, helpText);
});