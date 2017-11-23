import helpText from './help';
import bot from '../bot';
import BotCmd from './BotCmd';

new BotCmd('start', (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, helpText);
});