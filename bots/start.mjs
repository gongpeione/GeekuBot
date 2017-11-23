import helpText from './help';
import bot from '../bot';
import botCmd from './BotCmd';

botCmd.on('start', (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, helpText);
});