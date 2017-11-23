import bot from '../bot';
import BotCmd from './BotCmd';

export const helpText = `
雷猴我是一个机器人，我阔以做这些事：
/start 显示初始信息
/help 查看帮助
`;

new BotCmd('start', (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, helpText);
});

export default helpText;