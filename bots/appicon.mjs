import bot from '../bot';
import { http } from '../utils/';
import cheerio from 'cheerio';

bot.onText(/\/appicon\s(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];
    http.get(url)
        .then(res => {
            const data = res.data;
            const $ = cheerio.load(data);
            const className = '#main #content div.lockup.product.application div.artwork>img.artwork'
            let imgUrl = $(className).attr('src-swap');
            imgUrl = imgUrl.replace(/source\/\d+x\d+bb/, 'source/1024x1024bb');
            bot.sendMessage(chatId, imgUrl);
        });
});