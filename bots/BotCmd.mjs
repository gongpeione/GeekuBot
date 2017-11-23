import { cmdReg } from './commands';
import bot from '../bot';

export default class BotCmd {
    constructor (cmdName, cb) {
        this.reg = cmdReg[cmdName];
        this.cmd = cmdName;
        this.cb = cb;
        if (!this.reg) {
            throw new TypeError('Command not exist!');
        }
        this.start();
    }
    start () {
        bot.onText(this.reg, (msg, match) => {
            console.log(match, this.reg);
            if (msg.chat.type === 'group' && !match[1]) {
                return
            }
            this.cb.call(null, msg, match);
        });
    }
}