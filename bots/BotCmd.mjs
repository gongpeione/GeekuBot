import { cmdReg } from './commands';
import bot from '../bot';
import { isGroupMsg } from '../utils/';

class BotCmdClass {
    on (cmdName, cb) {
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
            const isGroup = isGroupMsg(msg);
            if (isGroup && !match[1]) {
                return
            }
            this.cb.call(null, msg, match);
        });
    }
}

export default new BotCmdClass();