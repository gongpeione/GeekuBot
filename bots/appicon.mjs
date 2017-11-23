import bot from '../bot';
import botCmd from './BotCmd';
import { http, isGroupMsg } from '../utils/';
import cheerio from 'cheerio';

botCmd.on('appicon', (msg, match) => {
    const chatId = msg.chat.id;
    const url = isGroupMsg(msg) ? match[2] : match[1];
    http.get(url.trim())
        .then(res => {
            const data = res.data;
            const $ = cheerio.load(data);
            const className = '#main #content div.lockup.product.application div.artwork>img.artwork'
            let imgUrl = $(className).attr('src-swap');
            imgUrl = imgUrl.replace(/source\/\d+x\d+bb/, 'source/1024x1024bb');
            bot.sendMessage(chatId, imgUrl);
        })
        .catch(e => {
            bot.sendMessage(chatId, 'Get icon failed.');
        });
});